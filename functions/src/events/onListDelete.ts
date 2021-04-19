import { firestore } from 'firebase-functions';
import { recursiveDelete } from '../utils/db';

export const deleteListItems = firestore.document('owners/{owner}/lists/{list}').onDelete(snap => {
  const docPath = snap.ref.path;
  return recursiveDelete(docPath);
});
