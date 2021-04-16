import { ApplicationCommand, CommandRequest, GuildApplicationCommand } from '../types/discord';
import { format, isThisYear, isThisMonth } from 'date-fns';

export const getOwnerID = (userOrGuildID: string, isGuild = true) => {
  return `${isGuild ? 'G' : 'U'}-${userOrGuildID}`;
};

export const makeCmdReq = <T extends CommandRequest>(req: T) => req;

export const isFromGuild = (cmd: ApplicationCommand<any>): cmd is GuildApplicationCommand<any> => 'guild_id' in cmd;

export const formatDate = (d: Date) => {
  if (isThisMonth(d)) {
    return format(d, 'E, MMM d');
  }
  if (isThisYear(d)) {
    return format(d, 'MMM d');
  }
  return format(d, 'PP');
};
