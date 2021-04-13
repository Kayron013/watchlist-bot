import 'dotenv/config';
import env from '../env';
import { Registrar } from './Registrar';
import { echoCommand } from './commands';

console.log({ ...env });

(async () => {
  const registrar = new Registrar({ ...env });

  const res = await registrar.registerCommand(echoCommand.request, true);
  const body = await res.json();
  console.log({ body });
})();
