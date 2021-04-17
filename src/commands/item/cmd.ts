import { GuildApplicationCommand } from '../../types/discord';
import { makeCmdReq } from '../../utils/watchlist';
import * as options from './options';

const reqOpts = Object.values(options).map(opt => opt.request);

export const request = makeCmdReq({
  name: 'item',
  description: 'Manage a watchlist item',
  options: reqOpts,
} as const);

export type ItemRequest = typeof request;

export type ItemCommand = GuildApplicationCommand<ItemRequest>;
