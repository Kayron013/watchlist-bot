import { InteractionResponseType } from 'discord-interactions';
import { CommandHandler } from '../../types/discord';
import { EchoCommand } from './cmd';

export const handler: CommandHandler<EchoCommand> = cmd => {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: cmd.data.options[0].value,
    },
  };
};
