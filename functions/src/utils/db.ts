import * as functions from 'firebase-functions';
process.env.DEBUG = 'true';
import * as admin from 'firebase-admin';
const firebase_tools = require('firebase-tools');

admin.initializeApp();

export const recursiveDelete = async (path: string): Promise<any> => {
  console.debug({ path });
  console.debug({ project: process.env.GCLOUD_PROJECT });
  console.debug({ fbToken: functions.config().fb.token });

  const token = await admin.auth().createCustomToken('some_uid');
  console.debug({ token });

  return firebase_tools.firestore.delete(path, {
    project: process.env.GCLOUD_PROJECT,
    recursive: true,
    yes: true,
    token: token, //functions.config().fb.token,
  });
};

//const token = '1//0dKxvtPUKhHdMCgYIARAAGA0SNwF-L9IrAvs-vyfQ426NtEVAlPQmGXSwPR5Wo291I2Np2JRH_YqCwoyO_oTBWBiStmBHMvFLuk';
//const project = 'watchlist-bot';

//recursiveDelete('owners/G-470728052545159171/lists/anime/items').then(() => console.log('Done.'));

//import * as admin from 'firebase-admin';

//const db = admin.firestore();

//export const deleteCollection = (path: string) => {
//   const collectionRef = db.collection(path);
//   const query = collectionRef.orderBy('__name__').limit(batchSize);

//   return new Promise((resolve, reject) => {
//     deleteQueryBatch(query, resolve).catch(reject);
//   });
//}

//const deleteQueryBatch = async (query: admin.firestore.Query, resolve:Function) => {
//  const snapshot = await query.get();

//  const batchSize = snapshot.size;
//  if (batchSize === 0) {
//    // When there are no documents left, we are done
//    resolve();
//    return;
//  }

//  // Delete documents in a batch
//  const batch = db.batch();
//  snapshot.docs.forEach(doc => {
//    batch.delete(doc.ref);
//  });
//  await batch.commit();

//  // Recurse on the next process tick, to avoid
//  // exploding the stack.
//  process.nextTick(() => {
//    deleteQueryBatch(query, resolve);
//  });
//}
