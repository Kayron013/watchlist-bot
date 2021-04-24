import env from '../env';
import { Registrar } from './Registrar';
import * as commands from '../commands';
import util from 'util';

const REGISTER_FOR_GUILD = true;

const commandsToRegister = Object.values(commands);

(async () => {
  const registrar = new Registrar({ ...env });

  if (false) {
    const commands = await registrar.getCommands(REGISTER_FOR_GUILD).then(r => r.json());
    for (const cmd of commands) {
      await registrar.deleteCommand(cmd.id, REGISTER_FOR_GUILD);
    }
    return;
  }

  for (const cmd of commandsToRegister) {
    const res = await registrar.registerCommand(cmd.request, REGISTER_FOR_GUILD);
    const body = await res.json();
    console.log({ body });
    if (body.errors) {
      console.log(util.inspect(body.errors, false, Infinity));
    }
  }
})();
