import { format, isThisMonth, isThisYear } from 'date-fns';
import { InteractionResponseType } from 'discord-interactions';
import {
  ApplicationCommand,
  CommandHandler,
  CommandOption,
  CommandRequest,
  CommandResponse,
  GuildApplicationCommand,
  OptionHandler,
} from '../types/discord';
import { narrowType } from './type';

export const getOwnerID = (userOrGuildID: string, isGuild = true) => {
  return `${isGuild ? 'G' : 'U'}-${userOrGuildID}`;
};

export const makeCmdReq = narrowType<CommandRequest>();

export const makeOptReq = narrowType<CommandOption>();

export const getCmdHandlers = (commands: CommandBundle) =>
  Object.values(commands).reduce((acc, cmd) => {
    return { ...acc, [cmd.request.name]: cmd.handler };
  }, {} as Record<string, CommandHandler<any>>);

export const getOptHandlers = (options: OptionBundle) =>
  Object.values(options).reduce((acc, opt) => {
    return { ...acc, [opt.request.name]: opt.handler };
  }, {} as Record<string, OptionHandler<any, any>>);

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

export const isFromGuild = (cmd: ApplicationCommand<any>): cmd is GuildApplicationCommand<any> => 'guild_id' in cmd;

export const formatDate = (d: Date) => {
  if (isThisMonth(d)) {
    return format(d, 'E, MMM d'); // Wed, Apr 9
  }
  if (isThisYear(d)) {
    return format(d, 'MMM d'); // Apr 9
  }
  return format(d, 'PP'); // Apr 9, 2020
};

export const paramsExist = (...params: (string | number)[]) => {
  const invalid = params.find(p => p === null || p === undefined || p == '');
  return Boolean(!invalid);
};

export const invlidInputResponse: CommandResponse = {
  type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: { content: 'Invalid Input' },
};
