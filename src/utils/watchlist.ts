import { ApplicationCommand, CommandRequest, GuildApplicationCommand } from '../types/discord';

export const getOwnerID = (userOrGuildID: string, isGuild = true) => {
  return `${isGuild ? 'G' : 'U'}-${userOrGuildID}`;
};

export const makeCmdReq = <T extends CommandRequest>(req: T) => req;

export const isFromGuild = (cmd: ApplicationCommand<any>): cmd is GuildApplicationCommand<any> => 'guild_id' in cmd;
