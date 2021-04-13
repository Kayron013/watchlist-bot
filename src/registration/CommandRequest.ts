import { InteractionResponseType, InteractionType } from 'discord-interactions';

export interface CommandRequest {
  name: string;
  description: string;
  options?: CommandOption[];
  default_permission?: boolean;
}

export interface CommandOption {
  type: CommandOptionType;
  name: string;
  description: string;
  required?: boolean;
  choices?: any[];
  options?: CommandOption[];
}

export enum CommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
}

export interface CommandOptionChoice {
  name: string;
  value: string | number;
}

export interface CommandResponse {
  type: InteractionResponseType;
  data?: {
    tts?: boolean;
    content?: string;
    embeds?: any[];
    allowed_mentions?: { parse: string[] };
  };
}

export interface ApplicationCommand {
  id: string;
  application_id: string;
  type: InteractionType;
  data: AppCommandInteractionData;
  guild_id?: string;
  channel_id?: string;
  member?: any;
  user?: any;
  token: string;
  version: 1;
}

export interface AppCommandInteractionData {
  id: string;
  name: string;
  options?: AppCommandInteractionOption[];
}

export interface AppCommandInteractionOption {
  name: string;
  type: CommandOptionType;
  value?: any;
  options?: AppCommandInteractionOption[];
}

export type CommandHandler = (cmd: ApplicationCommand) => CommandResponse;
