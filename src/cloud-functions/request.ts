import fetch from 'node-fetch';
import env from '../env';
import { auth } from '../firebase';

export const callFunction = async (url: string, body: Object) => {
  const token = await auth.createCustomToken(env.ADMIN_UID, { admin: true });

  console.log({ id: env.ADMIN_UID, token });
  return fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ data: body }),
  });
};
