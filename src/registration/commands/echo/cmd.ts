import { CommandOptionType, CommandRequest } from '../../CommandRequest';

const echoCmd: CommandRequest = {
  name: 'echo',
  description: "Whatever you say, I'll say it right back.",
  options: [
    {
      name: 'speach',
      description: "Whatever you'd like to say.",
      type: CommandOptionType.STRING,
      required: true,
    },
  ],
};

export default echoCmd;
