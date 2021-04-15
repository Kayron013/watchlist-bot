import { CommandOptionType, GuildApplicationCommand } from '../../types/discord';
import { makeCmdReq } from '../../utils/watchlist';

const cmdReq = makeCmdReq({
  name: 'list',
  description: 'Manage a watchlist',
  options: [
    {
      name: 'out',
      description: 'View the entries in a watchlist',
      type: CommandOptionType.SUB_COMMAND,
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
  ],
} as const);

export default cmdReq;

export type ListRequest = typeof cmdReq;

export type ListCommand = GuildApplicationCommand<ListRequest>;
