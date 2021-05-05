import { AppCommandInteractionOption, CommandOptionType, OptionParam } from '../../../../types/discord';
import { makeOptReq } from '../../../../utils/watchlist';

export const request = makeOptReq({
  name: 'reorder',
  description: 'Reorder an item in a watchlist',
  type: CommandOptionType.SUB_COMMAND,
  options: [
    {
      name: 'list',
      description: 'Name of watchlist',
      type: CommandOptionType.STRING,
      required: true,
    },
    {
      name: 'from',
      description: 'Position moving from',
      type: CommandOptionType.INTEGER,
      required: true,
    },
    {
      name: 'to',
      description: 'Position moving to',
      type: CommandOptionType.INTEGER,
      required: true,
    },
  ],
} as const);

export type Req = typeof request;

export type Option = AppCommandInteractionOption<Req>;

type ListParam = OptionParam<Req, 0>;
type FromParam = OptionParam<Req, 1>;
type ToParam = OptionParam<Req, 2>;

export type Params = [ListParam, FromParam, ToParam];
