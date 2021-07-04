import { firestore } from 'firebase-admin';
import { firestore as f, logger } from 'firebase-functions';

export const updateListLength = f.document('owners/{owner}/lists/{list}/items/{item}').onWrite(async change => {
  // An item was modified
  if (change.before.exists && change.after.exists) return;

  const lengthChange = change.before.exists ? -1 : 1;

  const listRef = change.after.ref.parent.parent!;

  await listRef
    .update({
      length: firestore.FieldValue.increment(lengthChange),
    })
    .catch(e => {
      logger.error('Error updating list length', {
        item: change.after.ref.path,
        list: listRef.path,
        beforeExists: change.before.exists,
        afterExists: change.after.exists,
        lengthChange,
      });
      throw e;
    });
});
