import env from '../env';
import { auth } from '../firebase';

(async () => {
  const user = await auth.getUser(env.ADMIN_UID);
  console.log({ user });
})();
