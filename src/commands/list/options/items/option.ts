import { AppCommandInteractionOption, CommandOptionType, OptionParam } from '../../../../types/discord';
import { makeOptReq } from '../../../../utils/watchlist';

export const request = makeOptReq({
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
} as const);

export type Req = typeof request;

export type Option = AppCommandInteractionOption<Req>;

type ListParam = OptionParam<Req, 0>;
type StartParam = OptionParam<Req, 1>;

export type Params = [ListParam, StartParam];
