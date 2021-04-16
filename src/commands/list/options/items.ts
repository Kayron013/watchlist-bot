import { InteractionResponseType } from 'discord-interactions';
import { MessageEmbed } from 'discord.js';
import { getListItems } from '../../../db';
import { DB, List, ListItem } from '../../../types/db';
import { AppCommandInteractionOption, OptionHandler, OptionParam } from '../../../types/discord';
import { msgFormat } from '../../../utils/discord';
import { formatDate, getOwnerID } from '../../../utils/watchlist';
import { ListCommand, ListRequest } from '../cmd';

export const listItemsHandler: OptionHandler<ListItemsOption, ListCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);
  const options = opt.options as Params;

  const list = options[0].value;
  const _start = options[1]?.value;
  const start = _start && _start > 0 ? _start : 1;

  const res = await getListItems({ ownerID, list, start });
  if (!res.success) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: res.message },
    };
  }

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { embeds: [formatResponse(list, res.data, start)] },
  };
};

export type ListItemsOption = AppCommandInteractionOption<CmdOpt>;

const formatResponse = (list: string, items: DB<ListItem>[], start: number) => {
  const embed = new MessageEmbed().setColor('#0099ff').setTitle(`Watchlist: ${list}`);
  items.forEach((item, idx) => {
    const date = item.releaseDate ? formatDate(item.releaseDate.toDate()) : null;
    embed.addField(`${idx + start}. ${item.name}`, date ? msgFormat.italic(date) : '\u200b');
  });
  return embed;
};

type CmdOpt = ListRequest['options'][1];
type ListOpt = OptionParam<CmdOpt, 0>;
type StartOpt = OptionParam<CmdOpt, 1>;
type Params = [ListOpt, StartOpt?];
