import { db, FieldValue } from '../firebase';
import { List } from '../types/db';

export const addList: AddList = async opts => {
  try {
    const listRef = db.doc(`/owners/${opts.ownerID}/lists/${opts.name}`);

    const listData: List = {
      name: opts.name,
      description: opts.description || '',
      createdAt: (FieldValue.serverTimestamp() as unknown) as Date,
      createdBy: opts.userID,
    };

    await listRef.create(listData);

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

type AddList = (opts: Opts) => Promise<{ success: false; message: string } | { success: true; data: string }>;
