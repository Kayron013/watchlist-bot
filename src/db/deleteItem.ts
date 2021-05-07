import { db } from '../firebase';
import { QueryRef, DbFunc, ListItem, DocRef, List } from '../types/db';
import { msgFormat } from '../utils/discord';

export const deleteItem: DbFunc<Opts, string> = async opts => {
  const listRef = db.doc(`owners/${opts.ownerID}/lists/${opts.list}`) as DocRef<List>;
  const itemQuery = listRef
    .collection(`items`)
    .orderBy('rank')
    .offset(opts.itemNum - 1)
    .limit(1) as QueryRef<ListItem>;

  return db.runTransaction(async t => {
    const list = (await t.get(listRef)).data();

    if (!list) {
      return { success: false, message: `You don't have a list named ${msgFormat.code(opts.list)}.` };
    }

    if (list.isLocked) {
      return {
        success: false,
        message: `This list is currently locked for normalization. Please try again in a moment`,
      };
    }

    const itemDocs = (await t.get(itemQuery)).docs;

    if (!itemDocs.length) {
      return { success: false, message: 'Invalid item' };
    }

    const item = itemDocs[0].data();

    await itemDocs[0].ref.delete();

    return { success: true, data: `${msgFormat.code(item.name)} has been deleted from ${msgFormat.code(opts.list)}.` };
  });
};

interface Opts {
  list: string;
  itemNum: number;
  ownerID: string;
}
