import { firestore } from 'firebase-admin';
import { firestore as f, logger } from 'firebase-functions';

export const updateListNum = f.document('owners/{owner}/lists/{list}').onWrite(async change => {
  // A list was modified
  if (change.before.exists && change.after.exists) return;

  const numChange = change.before.exists ? -1 : 1;

  const ownerRef = change.after.ref.parent.parent!;

  // Using 'set' instead of 'update' because the doc may not exist yet
  await ownerRef
    .set(
      {
        listNum: firestore.FieldValue.increment(numChange),
      },
      { merge: true }
    )
    .catch(e => {
      logger.error('Error updating list num', {
        list: change.after.ref.path,
        owner: ownerRef.path,
        beforeExists: change.before.exists,
        afterExists: change.after.exists,
        numChange,
      });
      throw e;
    });
});
