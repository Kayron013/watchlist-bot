import { InteractionResponseType } from 'discord-interactions';
import { MessageEmbed } from 'discord.js';
import { getLists } from '../../../db/getLists';
import { List } from '../../../types/db';
import { AppCommandInteractionOption, OptionHandler } from '../../../types/discord';
import { msgFormat } from '../../../utils/discord';
import { getOwnerID } from '../../../utils/watchlist';
import { ListCommand, ListRequest } from '../cmd';

export const listAllHandler: OptionHandler<ListOutOption, ListCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);

  const res = await getLists({ ownerID });
  if (!res.success) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: res.message },
    };
  }

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { embeds: [formatResponse(res.data)] },
  };
};

export type ListOutOption = AppCommandInteractionOption<ListRequest['options'][0]>;

const formatResponse = (lists: List[]) => {
  const embed = new MessageEmbed().setColor('#0099ff').setTitle('All Watchlists');
  lists.forEach((list, idx) =>
    embed.addField(`${idx + 1}. ${list.name}`, list.description ? msgFormat.italic(list.description) : '\u200b')
  );
  return embed;
};
