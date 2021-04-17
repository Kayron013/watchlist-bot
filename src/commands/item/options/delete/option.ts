import { AppCommandInteractionOption, CommandOptionType, OptionParam } from '../../../../types/discord';
import { makeOptReq } from '../../../../utils/watchlist';

export const request = makeOptReq({
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
} as const);

export type Req = typeof request;

export type Option = AppCommandInteractionOption<Req>;

type ListParam = OptionParam<Req, 0>;
type ItemNumParam = OptionParam<Req, 1>;

export type Params = [ListParam, ItemNumParam];
