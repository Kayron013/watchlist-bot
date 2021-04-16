import { InteractionResponseType } from 'discord-interactions';
import { CommandHandler } from '../../types/discord';
import { ItemCommand } from './cmd';
import * as options from './options';

const handler: CommandHandler<ItemCommand> = async cmd => {
  const option = cmd.data.options[0];

  switch (option.name) {
    case 'add':
      return options.itemAddHandler(option as options.ItemAddOption, cmd);
    case 'delete':
      return options.itemDeleteHandler(option as options.ItemDeleteOption, cmd);
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
