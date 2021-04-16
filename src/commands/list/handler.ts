import { InteractionResponseType } from 'discord-interactions';
import { CommandHandler } from '../../types/discord';
import { ListCommand } from './cmd';
import * as options from './options';

const handler: CommandHandler<ListCommand> = async cmd => {
  const option = cmd.data.options[0];

  switch (option.name) {
    case 'all':
      return options.listAllHandler(option as options.ListOutOption, cmd);
    case 'add':
      return options.listAddHandler(option as options.ListAddOption, cmd);
    case 'delete':
      return options.listDeleteHandler(option as options.ListDeleteOption, cmd);
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
