import { AppCommandInteractionOption, CommandOptionType, OptionParam } from '../../../../types/discord';
import { makeOptReq } from '../../../../utils/watchlist';

export const request = makeOptReq({
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
} as const);

export type Req = typeof request;

export type Option = AppCommandInteractionOption<Req>;

type NameParam = OptionParam<Req, 0>;

export type Params = [NameParam];
