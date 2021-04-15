import { InteractionResponseType } from 'discord-interactions';
import { CommandHandler } from '../../types/discord';
import { ListCommand } from './cmd';
import { listAddHandler, ListAddOption, listOutHandler, ListOutOption } from './options';

const handler: CommandHandler<ListCommand> = async cmd => {
  const option = cmd.data.options[0];

  switch (option.name) {
    case 'out':
      return listOutHandler(option as ListOutOption, cmd);
    case 'add':
      return listAddHandler(option as ListAddOption, cmd);
    default:
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'Unsupported Command',
        },
      };
  }
};
export default handler;
