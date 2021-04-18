import { callFunction } from './request';

const baseUrl = 'https://us-central1-watchlist-bot.cloudfunctions.net';

export const recursiveDelete = (path: string) => callFunction(`${baseUrl}/recursiveDelete`, { path });
