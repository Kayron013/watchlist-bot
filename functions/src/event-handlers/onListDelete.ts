import { firestore } from 'firebase-functions';
import { deleteSubCollections } from '../utils/db';

export const deleteListItems = firestore.document('owners/{owner}/lists/{list}').onDelete(snap => {
  const docPath = snap.ref.path;
  return deleteSubCollections(docPath);
});
