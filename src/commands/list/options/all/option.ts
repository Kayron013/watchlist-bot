import { AppCommandInteractionOption, CommandOptionType, OptionParam } from '../../../../types/discord';
import { makeOptReq } from '../../../../utils/watchlist';

export const request = makeOptReq({
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
} as const);

export type Req = typeof request;

export type Option = AppCommandInteractionOption<Req>;

type StartParam = OptionParam<Req, 0>;

export type Params = [StartParam] | undefined;
