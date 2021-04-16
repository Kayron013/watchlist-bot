import { CommandOptionType, GuildApplicationCommand } from '../../types/discord';
import { makeCmdReq } from '../../utils/watchlist';

const cmdReq = makeCmdReq({
  name: 'item',
  description: 'Manage a watchlist item',
  options: [
    {
      name: 'add',
      description: 'Add an item to a watchlist',
      type: CommandOptionType.SUB_COMMAND,
      options: [
        {
          name: 'list',
          description: 'Name of watchlist',
          type: CommandOptionType.STRING,
          required: true,
        },
        {
          name: 'item',
          description: 'Name of item',
          type: CommandOptionType.STRING,
          required: true,
        },
        {
          name: 'release_date',
          description: '{mm/dd/yyyy}',
          type: CommandOptionType.STRING,
          required: false,
        },
      ],
    },
    {
      name: 'delete',
      description: 'Remove item from watchlist',
      type: CommandOptionType.SUB_COMMAND,
      options: [
        {
          name: 'list',
          description: 'Name of watchlist',
          type: CommandOptionType.STRING,
          required: true,
        },
        {
          name: 'item_number',
          description: 'Number of item in watchlist',
          type: CommandOptionType.INTEGER,
          required: true,
        },
      ],
    },
  ],
} as const);

export default cmdReq;

export type ItemRequest = typeof cmdReq;

export type ItemCommand = GuildApplicationCommand<ItemRequest>;
