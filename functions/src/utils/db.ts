import * as functions from 'firebase-functions';
const firebase_tools = require('firebase-tools');

export const recursiveDelete = async (path: string): Promise<any> => {
  return firebase_tools.firestore.delete(path, {
    project: process.env.GCLOUD_PROJECT,
    recursive: true,
    yes: true,
    token: functions.config().fb.token,
  });
};
