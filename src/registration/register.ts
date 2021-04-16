import 'dotenv/config';
import env from '../env';
import { Registrar } from './Registrar';
import * as commands from '../commands';

const REGISTER_FOR_GUILD = true;

const commandsToRegister = Object.values(commands);

(async () => {
  const registrar = new Registrar({ ...env });

  for (const cmd of commandsToRegister) {
    const res = await registrar.registerCommand(cmd.request, REGISTER_FOR_GUILD);
    const body = await res.json();
    console.log({ body });
  }
})();
