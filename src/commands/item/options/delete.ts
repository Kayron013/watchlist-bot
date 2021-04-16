import { InteractionResponseType } from 'discord-interactions';
import { deleteItem } from '../../../db';
import { AppCommandInteractionOption, OptionHandler, OptionParam } from '../../../types/discord';
import { getOwnerID } from '../../../utils/watchlist';
import { ItemCommand, ItemRequest } from '../cmd';

export const itemDeleteHandler: OptionHandler<ItemDeleteOption, ItemCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);
  const params = opt.options as Params;

  const list = params[0].value.trim();
  const itemNum = params[1].value;
  const res = await deleteItem({ list, itemNum, ownerID });
  if (!res.success) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: res.message },
    };
  }

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content: res.data },
  };
};

type CmdOpt = ItemRequest['options'][1];
export type ItemDeleteOption = AppCommandInteractionOption<CmdOpt>;

type ListParam = OptionParam<CmdOpt, 0>;
type ItemParam = OptionParam<CmdOpt, 1>;
type Params = [ListParam, ItemParam];
