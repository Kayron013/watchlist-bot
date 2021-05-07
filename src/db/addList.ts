import { db, FieldValue } from '../firebase';
import { DbFunc, DocRef, List } from '../types/db';

export const addList: DbFunc<Opts, string> = async opts => {
  try {
    const listRef = db.doc(`/owners/${opts.ownerID}/lists/${opts.name}`) as DocRef<List>;

    await listRef.create({
      name: opts.name,
      description: opts.description || '',
      createdAt: (FieldValue.serverTimestamp() as unknown) as Date,
      createdBy: opts.userID,
      bucket: '0',
      isLocked: true,
    });

    return { success: true, data: 'List Added!' };
  } catch (e) {
    if (e.code === 6) {
      return { success: false, message: 'This list already exists.' };
    }
    console.error({ e });
    return { success: false, message: 'Oh no! I failed to add the list.' };
  }
};

interface Opts {
  name: string;
  description?: string;
  ownerID: string;
  userID: string;
}
