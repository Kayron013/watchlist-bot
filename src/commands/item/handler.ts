import { InteractionResponseType } from 'discord-interactions';
import { CommandHandler } from '../../types/discord';
import { getOptHandlers } from '../../utils/watchlist';
import { ItemCommand } from './cmd';
import * as options from './options';

export const handler: CommandHandler<ItemCommand> = async cmd => {
  const option = cmd.data.options[0];

  const optHandler = optHandlers[option.name];

  if (!handler) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'Unsupported Command',
      },
    };
  }

  return optHandler(option, cmd);
};

const optHandlers = getOptHandlers(options);
