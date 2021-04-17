import { AppCommandInteractionOption, CommandOptionType, OptionParam } from '../../../../types/discord';
import { makeOptReq } from '../../../../utils/watchlist';

export const request = makeOptReq({
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
} as const);

export type Req = typeof request;

export type Option = AppCommandInteractionOption<Req>;

type NameParam = OptionParam<Req, 0>;
type DescParam = OptionParam<Req, 1>;

export type Params = [NameParam, DescParam];
