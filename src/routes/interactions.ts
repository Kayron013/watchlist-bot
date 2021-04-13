import { InteractionResponseType, InteractionType, verifyKeyMiddleware } from 'discord-interactions';
import { Router } from 'express';
import env from '../env';

const route = Router();

route.use(verifyKeyMiddleware(env.PUBLIC_KEY));

route.post('/', (req, res) => {
  const { body } = req;
  if (body.type === InteractionType.PING) {
    res.send({ type: InteractionResponseType.PONG });
  } else {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'Message received',
      },
    });
  }
});

export const InteractionsRouter = route;
