import { InteractionResponseType } from 'discord-interactions';
import { MessageEmbed } from 'discord.js';
import { addList } from '../../../../db/addList';
import { OptionHandler } from '../../../../types/discord';
import { msgFormat } from '../../../../utils/discord';
import { getOwnerID } from '../../../../utils/watchlist';
import { ListCommand } from '../../cmd';
import { Option } from './option';

export const handler: OptionHandler<Option, ListCommand> = async (opt, cmd) => {
  const ownerID = getOwnerID(cmd.guild_id);

  const name = opt.options[0].value.trim();
  const description = opt.options[1]?.value.trim();
  const res = await addList({ name, description, ownerID, userID: cmd.member.user.id });
  if (!res.success) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: res.message },
    };
  }

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { embeds: [formatResponse(name, description)] },
  };
};

const formatResponse = (name: string, desc?: string) => {
  const embed = new MessageEmbed().setColor('#0099ff').setTitle('Watchlist Added');
  embed.addField(name, desc ? msgFormat.italic(desc) : '\u200b');
  return embed;
};
