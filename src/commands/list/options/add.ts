import { InteractionResponseType } from 'discord-interactions';
import { addList } from '../../../db/addList';
import { AppCommandInteractionOption, OptionHandler } from '../../../types/discord';
import { getOwnerID } from '../../../utils/watchlist';
import { ListCommand, ListRequest } from '../cmd';

export const listAddHandler: OptionHandler<ListAddOption, ListCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);

  const name = opt.options[0].value;
  const description = opt.options[1]?.value;
  const res = await addList({ name, description, ownerID });
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

export type ListAddOption = AppCommandInteractionOption<ListRequest['options'][1]>;
