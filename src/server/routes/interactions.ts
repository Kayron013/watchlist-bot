import { InteractionResponseType, InteractionType, verifyKeyMiddleware } from 'discord-interactions';
import { Router } from 'express';
import util from 'util';
import * as commands from '../../commands';
import env from '../../env';
import { ApplicationCommand } from '../../types/discord';
import { getCmdHandlers, isFromGuild } from '../../utils/watchlist';

const route = Router();

route.get('/', (req, res) => {
  res.send('Thanks for interacting!');
});

route.use(verifyKeyMiddleware(env.PUBLIC_KEY));

route.post('/', async (req, res) => {
  const body: ApplicationCommand<any> = req.body;

  console.debug('\n\nIncomming Interaction...');
  console.debug(util.inspect(body, false, Infinity));

  if (body.type === InteractionType.PING) {
    res.send({ type: InteractionResponseType.PONG });
  } else {
    const isFromDM = !isFromGuild(body);
    if (isFromDM) {
      res.send('DM commands are unsupported');
    }

    const cmdName = body.data.name;
    const handler = cmdHandlers[cmdName];
    const resp = await handler(body);
    console.debug('\n\nInteraction Response...');
    console.debug({ resp });
    res.send(resp);
  }
});

export const InteractionsRouter = route;

const cmdHandlers = getCmdHandlers(commands);
