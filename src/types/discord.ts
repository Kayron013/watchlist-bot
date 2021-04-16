import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { User, GuildMember, MessageEmbed } from 'discord.js';

export interface CommandRequest {
  readonly name: string;
  readonly description: string;
  readonly options?: readonly CommandOption[];
  readonly default_permission?: boolean;
}

export interface CommandOption {
  readonly type: CommandOptionType;
  readonly name: string;
  readonly description: string;
  readonly required?: boolean;
  readonly choices?: any[];
  readonly options?: readonly CommandOption[];
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

type CommandValueTypes = {
  [CommandOptionType.SUB_COMMAND]: undefined;
  [CommandOptionType.SUB_COMMAND_GROUP]: undefined;
  [CommandOptionType.STRING]: string;
  [CommandOptionType.INTEGER]: number;
  [CommandOptionType.BOOLEAN]: boolean;
  [CommandOptionType.USER]: any;
  [CommandOptionType.CHANNEL]: any;
  [CommandOptionType.ROLE]: any;
};

export interface CommandOptionChoice {
  name: string;
  value: string | number;
}

export interface CommandResponse {
  type: InteractionResponseType;
  data?: {
    tts?: boolean;
    content?: string;
    embeds?: MessageEmbed[];
    allowed_mentions?: {};
  };
}

export interface BaseApplicationCommand<T extends CommandRequest> {
  readonly id: string;
  readonly application_id: string;
  readonly type: InteractionType;
  readonly data: AppCommandInteractionData<T>;
  readonly token: string;
  readonly version: 1;
}

export interface GuildApplicationCommand<T extends CommandRequest> extends BaseApplicationCommand<T> {
  readonly guild_id: string;
  readonly channel_id: string;
  readonly member: GuildMember;
}

export interface UserApplicationCommand<T extends CommandRequest> extends BaseApplicationCommand<T> {
  readonly user: User;
}

export type ApplicationCommand<T extends CommandRequest> = GuildApplicationCommand<T> | UserApplicationCommand<T>;

export interface AppCommandInteractionData<T extends CommandRequest> {
  readonly id: string;
  readonly name: T['name'];
  readonly options: T['options'] extends Readonly<CommandOption[]> ? MappedOptions<T['options']> : never;
}

export interface AppCommandInteractionOption<T extends CommandOption> {
  readonly name: T['name'];
  readonly type: T['type'];
  readonly value: CommandValueTypes[T['type']];
  readonly options: T['options'] extends Readonly<CommandOption[]> ? MappedOptions<T['options']> : never;
}

export type CommandHandler<ApplicationCommand> = (cmd: ApplicationCommand) => Promise<CommandResponse>;

export type OptionHandler<T extends AppCommandInteractionOption<any>, V extends ApplicationCommand<any>> = (
  opt: T extends AppCommandInteractionOption<infer R> ? T : never,
  appCmd: V extends ApplicationCommand<infer R> ? V : never
) => Promise<CommandResponse>;

type MappedOptions<T extends Readonly<CommandOption[]>> = AppCommandInteractionOption<T[number]>[];

export type OptionParam<
  T extends CommandOption,
  Idx extends keyof T['options']
> = T['options'][Idx] extends CommandOption ? AppCommandInteractionOption<T['options'][Idx]> : never;
