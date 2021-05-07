import { Server } from 'http';
import { app } from '../server';

const PORT = process.env.PORT || 8000;

const server = new Server(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
