import { CommandOptionType, GuildApplicationCommand, OptionParam } from '../../types/discord';
import { makeCmdReq } from '../../utils/watchlist';

export const request = makeCmdReq({
  name: 'lists',
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
} as const);

export type ListsRequest = typeof request;

export type ListsCommand = GuildApplicationCommand<ListsRequest>;

type StartParam = OptionParam<ListsRequest, 0>;

export type Params = [StartParam] | undefined;
