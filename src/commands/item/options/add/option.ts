import { AppCommandInteractionOption, CommandOptionType, OptionParam } from '../../../../types/discord';
import { makeOptReq } from '../../../../utils/watchlist';

export const request = makeOptReq({
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
} as const);

export type Req = typeof request;

export type Option = AppCommandInteractionOption<Req>;

type ListParam = OptionParam<Req, 0>;
type ItemParam = OptionParam<Req, 1>;
type ReleaseDateParam = OptionParam<Req, 2>;

export type Params = [ListParam, ItemParam, ReleaseDateParam];
