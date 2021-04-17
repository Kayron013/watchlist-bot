import { GuildApplicationCommand } from '../../types/discord';
import { makeCmdReq } from '../../utils/watchlist';
import * as options from './options';

const reqOpts = Object.values(options).map(opt => opt.request);

export const request = makeCmdReq({
  name: 'list',
  description: 'Manage a watchlist',
  options: reqOpts,
} as const);

export type ListRequest = typeof request;

export type ListCommand = GuildApplicationCommand<ListRequest>;
