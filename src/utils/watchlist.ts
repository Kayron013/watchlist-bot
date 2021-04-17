import { format, isThisMonth, isThisYear } from 'date-fns';
import {
  ApplicationCommand,
  CommandHandler,
  CommandOption,
  CommandRequest,
  GuildApplicationCommand,
  OptionHandler,
} from '../types/discord';

export const getOwnerID = (userOrGuildID: string, isGuild = true) => {
  return `${isGuild ? 'G' : 'U'}-${userOrGuildID}`;
};

export const makeCmdReq = <T extends CommandRequest>(req: T) => req;

export const makeOptReq = <T extends CommandOption>(req: T) => req;

interface CommandBundle {
  [x: string]: {
    request: CommandRequest;
    handler: CommandHandler<any>;
  };
}

interface OptionBundle {
  [x: string]: {
    request: CommandOption;
    handler: OptionHandler<any, any>;
  };
}

export const getCmdHandlers = (commands: CommandBundle) =>
  Object.values(commands).reduce((acc, cmd) => {
    return { ...acc, [cmd.request.name]: cmd.handler };
  }, {} as Record<string, CommandHandler<any>>);

export const getOptHandlers = (options: OptionBundle) =>
  Object.values(options).reduce((acc, opt) => {
    return { ...acc, [opt.request.name]: opt.handler };
  }, {} as Record<string, OptionHandler<any, any>>);

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
