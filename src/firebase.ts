import admin from 'firebase-admin';
import env from './env';

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: env.SA_CLIENT_EMAIL,
    projectId: env.SA_PROJECT_ID,
    privateKey: env.SA_PRIVATE_KEY,
  }),
});

export const auth = admin.auth();

export const db = admin.firestore();
db.settings({
  ignoreUndefinedProperties: true,
});

export const FieldValue = admin.firestore.FieldValue;
