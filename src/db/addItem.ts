import { db, FieldValue } from '../firebase';
import { DbFunc, DocRef, ListItem } from '../types/db';

export const addItem: DbFunc<Opts, string> = async opts => {
  try {
    const itemRef = db.collection(`owners/${opts.ownerID}/lists/${opts.list}/items`).doc() as DocRef<ListItem>;

    await itemRef.create({
      name: opts.item,
      releaseDate: opts.releaseDate,
      createdAt: (FieldValue.serverTimestamp() as unknown) as Date,
      createdBy: opts.userID,
    });

    return { success: true, data: 'Item Added!' };
  } catch (e) {
    console.error({ e });
    return { success: false, message: 'Oh no! I failed to add the item.' };
  }
};

interface Opts {
  list: string;
  item: string;
  releaseDate?: Date;
  ownerID: string;
  userID: string;
}
