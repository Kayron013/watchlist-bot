import { InteractionResponseType } from 'discord-interactions';
import { CommandHandler } from '../../CommandRequest';

const echoHandler: CommandHandler = cmd => {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: cmd.data?.options?.[0].value,
    },
  };
};
export default echoHandler;
