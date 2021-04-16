import { db, FieldValue } from '../firebase';
import { ListItem } from '../types/db';

export const addItem: AddItem = async opts => {
  try {
    const itemRef = db.collection(`owners/${opts.ownerID}/lists/${opts.list}/items`).doc();

    const itemData: ListItem = {
      name: opts.item,
      releaseDate: opts.releaseDate,
      createdAt: (FieldValue.serverTimestamp() as unknown) as Date,
      createdBy: opts.userID,
    };

    await itemRef.create(itemData);

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

type AddItem = (opts: Opts) => Promise<{ success: false; message: string } | { success: true; data: string }>;
