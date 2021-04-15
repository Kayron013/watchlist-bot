import express from 'express';
import { logger } from './middleware/logger';
import { InteractionsRouter } from './routes/interactions';

export const app = express();

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/interactions', InteractionsRouter);
