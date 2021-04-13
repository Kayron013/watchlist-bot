import { InteractionResponseType, InteractionType, verifyKeyMiddleware } from 'discord-interactions';
import { Router } from 'express';
import env from '../../env';
import { echoCommand } from '../../registration/commands';

const route = Router();

route.get('/', (req, res) => {
  res.send('Thanks for interacting!');
});

route.use(verifyKeyMiddleware(env.PUBLIC_KEY));

route.post('/', (req, res) => {
  const { body } = req;
  if (body.type === InteractionType.PING) {
    res.send({ type: InteractionResponseType.PONG });
  } else {
    const resp = echoCommand.handler(body);
    res.send(resp);
  }
});

export const InteractionsRouter = route;
