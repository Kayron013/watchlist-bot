import { InteractionResponseType } from 'discord-interactions';
import { deleteItem } from '../../../../db';
import { getList } from '../../../../db/getList';
import { OptionHandler } from '../../../../types/discord';
import { getOwnerID } from '../../../../utils/watchlist';
import { ItemCommand } from '../../cmd';
import { Option, Params } from './option';

export const handler: OptionHandler<Option, ItemCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);
  const params = opt.options as Params;

  const list = params[0].value.trim();
  const itemNum = Math.max(params[1].value, 1);

  const listRes = await getList({ ownerID, name: list });

  if (!listRes.success) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: listRes.message },
    };
  }

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
