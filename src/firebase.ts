import admin from 'firebase-admin';
import env from './env';

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: env.SA_CLIENT_EMAIL,
    projectId: env.SA_PROJECT_ID,
    privateKey: env.SA_PRIVATE_KEY,
  }),
});

export const db = admin.firestore();

export const FieldValue = admin.firestore.FieldValue;
