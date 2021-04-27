import { db, FieldValue } from '../firebase';
import { CollRef, DbFunc, DocRef, List, ListItem } from '../types/db';
import LexoRank from '../utils/LexoRank/src';

export const addItem: DbFunc<Opts, string> = async opts => {
  try {
    const listRef = db.doc(`owners/${opts.ownerID}/lists/${opts.list}`) as DocRef<List>;
    const itemsRef = listRef.collection('items') as CollRef<ListItem>;
    const newItemRef = itemsRef.doc();
    const lastItemRef = itemsRef.orderBy('rank', 'desc').limit(1);

    await db.runTransaction(async t => {
      const lastItemDoc = (await t.get(lastItemRef)).docs[0];
      const rank = lastItemDoc ? LexoRank.from(lastItemDoc.get('rank')).increment() : new LexoRank('1');

      t.create(newItemRef, {
        name: opts.item,
        releaseDate: opts.releaseDate,
        createdAt: (FieldValue.serverTimestamp() as unknown) as Date,
        createdBy: opts.userID,
        rank: rank.toString(),
      });

      // Reset bucket to `0` if adding to empty list
      if (!lastItemDoc) {
        t.update(listRef, {
          bucket: '0',
        });
      }
    });

    return { success: true, data: 'Item Added!' };
  } catch (e) {
    console.error({ e });
    return { success: false, message: 'Failed to add the item.' };
  }
};

interface Opts {
  list: string;
  item: string;
  releaseDate?: Date;
  ownerID: string;
  userID: string;
}
