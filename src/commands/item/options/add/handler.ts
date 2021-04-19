import { InteractionResponseType } from 'discord-interactions';
import { MessageEmbed } from 'discord.js';
import { Option } from './option';
import { addItem } from '../../../../db';
import { OptionHandler } from '../../../../types/discord';
import { formatDate, getOwnerID } from '../../../../utils/watchlist';
import { ItemCommand } from '../../cmd';
import { Params } from './option';
import { getList } from '../../../../db/getList';

export const handler: OptionHandler<Option, ItemCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);
  const params = opt.options as Params;

  const list = params[0].value.trim();
  const item = params[1].value.trim();
  const releaseDateStr = params[2]?.value.trim();
  const releaseDate = releaseDateStr ? new Date(releaseDateStr) : undefined;

  if (releaseDate && !releaseDate.valueOf()) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'Release date is invalid.' },
    };
  }

  const listRes = await getList({ ownerID, name: list });

  if (!listRes.success) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: listRes.message },
    };
  }

  const res = await addItem({ list, item, ownerID, userID: cmd.member.user.id, releaseDate });
  if (!res.success) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: res.message },
    };
  }

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { embeds: [formatResponse(list, item, releaseDate)] },
  };
};

const formatResponse = (list: string, item: string, date?: Date) => {
  const embed = new MessageEmbed().setColor('#0099ff').setTitle('Item Added').setAuthor(`Watchlist: ${list}`);
  embed.addField('Title', item);
  if (date) {
    embed.addField('Release Date', formatDate(date));
  }
  return embed;
};
