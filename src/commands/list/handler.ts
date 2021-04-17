import { InteractionResponseType } from 'discord-interactions';
import { CommandHandler } from '../../types/discord';
import { getOptHandlers } from '../../utils/watchlist';
import { ListCommand } from './cmd';
import * as options from './options';

export const handler: CommandHandler<ListCommand> = async cmd => {
  const option = cmd.data.options[0];

  const optHandler = optHandlers[option.name];

  if (!optHandler) {
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
