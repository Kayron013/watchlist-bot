import { config } from 'firebase-functions';
const { firestore } = require('firebase-tools');

export const deleteSubCollections = (docPath: string): Promise<any> => {
  return firestore.delete(docPath, {
    project: process.env.GCLOUD_PROJECT,
    recursive: true,
    yes: true,
    token: config().fb.token,
  });
};
