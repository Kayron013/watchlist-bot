import { InteractionResponseType } from 'discord-interactions';
import { deleteList } from '../../../db';
import { AppCommandInteractionOption, OptionHandler } from '../../../types/discord';
import { getOwnerID } from '../../../utils/watchlist';
import { ListCommand, ListRequest } from '../cmd';

export const listDeleteHandler: OptionHandler<ListDeleteOption, ListCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);

  const name = opt.options[0].value.trim();
  const res = await deleteList({ name, ownerID });
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

export type ListDeleteOption = AppCommandInteractionOption<ListRequest['options'][2]>;
