import { InteractionResponseType } from 'discord-interactions';
import { MessageEmbed } from 'discord.js';
import { addItem } from '../../../db';
import { AppCommandInteractionOption, OptionHandler } from '../../../types/discord';
import { formatDate, getOwnerID } from '../../../utils/watchlist';
import { ItemCommand, ItemRequest } from '../cmd';

export const itemAddHandler: OptionHandler<ItemAddOption, ItemCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);

  const list = opt.options[0].value.trim();
  const item = opt.options[1].value.trim();
  const releaseDateStr = opt.options[2]?.value.trim();
  const releaseDate = releaseDateStr ? new Date(releaseDateStr) : undefined;

  if (releaseDate && !releaseDate.valueOf()) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'Release date is invalid.' },
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

export type ItemAddOption = AppCommandInteractionOption<ItemRequest['options'][0]>;
