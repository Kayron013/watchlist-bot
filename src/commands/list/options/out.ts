import { InteractionResponseType } from 'discord-interactions';
import { getLists } from '../../../db/getLists';
import { AppCommandInteractionOption, OptionHandler } from '../../../types/discord';
import { List } from '../../../types/db';
import { msgFormat } from '../../../utils/discord';
import { getOwnerID } from '../../../utils/watchlist';
import { ListCommand, ListRequest } from '../cmd';
import { MessageEmbed } from 'discord.js';

export const listOutHandler: OptionHandler<ListOutOption, ListCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);

  const res = await getLists(ownerID);
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
  lists.forEach(list => embed.addField(list.name, list.description, true));
  return embed;
};
