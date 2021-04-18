import { firestore } from 'firebase-functions';
import { recursiveDelete } from '../utils/db';

export const deleteListItems = firestore.document('owners/{owner}/lists/{list}').onDelete(snap => {
  const collPath = snap.ref.collection('items').path;
  console.info('Why do you hate me?');
  return recursiveDelete(collPath);
});
