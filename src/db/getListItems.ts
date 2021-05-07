import { db } from '../firebase';
import { QueryRef, DB, DbFunc, ListItem, DocRef, List } from '../types/db';
import { msgFormat } from '../utils/discord';

export const getListItems: DbFunc<Opts, DB<ListItem>[]> = async opts => {
  const listRef = db.doc(`owners/${opts.ownerID}/lists/${opts.list}`) as DocRef<List>;
  let itemsQuery = listRef
    .collection(`items`)
    .orderBy('rank')
    .offset(opts.start - 1)
    .limit(20) as QueryRef<DB<ListItem>>;

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

    const lists = (await t.get(itemsQuery)).docs.map(d => d.data());

    if (lists.length === 0) {
      return { success: false, message: 'No items found.' };
    }

    return { success: true, data: lists };
  });
};

interface Opts {
  ownerID: string;
  list: string;
  start: number;
}
