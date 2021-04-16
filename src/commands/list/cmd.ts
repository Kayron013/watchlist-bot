import { CommandOptionType, GuildApplicationCommand } from '../../types/discord';
import { makeCmdReq } from '../../utils/watchlist';

const cmdReq = makeCmdReq({
  name: 'list',
  description: 'Manage a watchlist',
  options: [
    {
      name: 'all',
      description: 'View all watchlists',
      type: CommandOptionType.SUB_COMMAND,
      options: [
        {
          name: 'start',
          description: 'Where to start listing from',
          type: CommandOptionType.INTEGER,
          required: false,
        },
      ],
    },
    {
      name: 'items',
      description: 'View the entries in a watchlist',
      type: CommandOptionType.SUB_COMMAND,
      options: [
        {
          name: 'list',
          description: 'Name of watchlist',
          type: CommandOptionType.STRING,
          required: true,
        },
        {
          name: 'start',
          description: 'Where to start listing from',
          type: CommandOptionType.INTEGER,
          required: false,
        },
      ],
    },
    {
      name: 'add',
      description: 'Add a watchlist',
      type: CommandOptionType.SUB_COMMAND,
      options: [
        {
          name: 'name',
          description: 'Name of watchlist',
          type: CommandOptionType.STRING,
          required: true,
        },
        {
          name: 'description',
          description: 'Description of watchlist',
          type: CommandOptionType.STRING,
          required: false,
        },
      ],
    },
    {
      name: 'delete',
      description: 'Remove a watchlist',
      type: CommandOptionType.SUB_COMMAND,
      options: [
        {
          name: 'name',
          description: 'Name of watchlist',
          type: CommandOptionType.STRING,
          required: true,
        },
      ],
    },
  ],
} as const);

export default cmdReq;

export type ListRequest = typeof cmdReq;

export type ListCommand = GuildApplicationCommand<ListRequest>;
