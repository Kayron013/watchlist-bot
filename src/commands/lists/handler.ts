import { InteractionResponseType } from 'discord-interactions';
import { MessageEmbed } from 'discord.js';
import { getLists } from '../../db/getLists';
import { List } from '../../types/db';
import { CommandHandler } from '../../types/discord';
import { msgFormat } from '../../utils/discord';
import { getOwnerID } from '../../utils/watchlist';
import { ListsCommand, Params } from './cmd';

export const handler: CommandHandler<ListsCommand> = async cmd => {
  const ownerID = getOwnerID(cmd.guild_id);
  const options = cmd.data?.options as Params;

  const _start = options?.[0]?.value;
  const start = _start && _start > 0 ? _start : 1;

  const res = await getLists({ ownerID, start });
  if (!res.success) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: res.message },
    };
  }

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { embeds: [formatResponse(res.data, start)] },
  };
};

const formatResponse = (lists: List[], start: number) => {
  const embed = new MessageEmbed().setColor('#0099ff').setTitle('All Watchlists');
  lists.forEach((list, idx) =>
    embed.addField(`${idx + start}. ${list.name}`, list.description ? msgFormat.italic(list.description) : '\u200b')
  );
  return embed;
};
