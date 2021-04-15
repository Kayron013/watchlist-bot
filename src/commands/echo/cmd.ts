import { ApplicationCommand, CommandOptionType } from '../../types/discord';
import { makeCmdReq } from '../../utils/watchlist';

const cmdReq = makeCmdReq({
  name: 'echo',
  description: "Whatever you say, I'll say it right back",
  options: [
    {
      name: 'speech',
      description: "Whatever you'd like to say",
      type: CommandOptionType.STRING,
      required: true,
    },
  ],
} as const);

export default cmdReq;

type EchoRequest = typeof cmdReq;

export type EchoCommand = ApplicationCommand<EchoRequest>;
