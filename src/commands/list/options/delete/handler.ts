import { InteractionResponseType } from 'discord-interactions';
import { Option } from './option';
import { deleteList } from '../../../../db';
import { OptionHandler } from '../../../../types/discord';
import { getOwnerID } from '../../../../utils/watchlist';
import { ListCommand } from '../../cmd';
import { Params } from './option';

export const handler: OptionHandler<Option, ListCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);
  const params = opt.options as Params;

  const name = params[0].value.trim();
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
