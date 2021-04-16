import { InteractionResponseType } from 'discord-interactions';
import { deleteItem } from '../../../db';
import { AppCommandInteractionOption, OptionHandler } from '../../../types/discord';
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

export type ItemDeleteOption = AppCommandInteractionOption<ItemRequest['options'][1]>;

type ListParam = AppCommandInteractionOption<ItemRequest['options'][1]['options'][0]>;
type ItemParam = AppCommandInteractionOption<ItemRequest['options'][1]['options'][1]>;
type Params = [ListParam, ItemParam];
