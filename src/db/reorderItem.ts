import { db } from '../firebase';
import { DbFunc, DocRef, List, ListItem, QueryRef } from '../types/db';
import { msgFormat } from '../utils/discord';
import LexoRank from '@kayron013/lexorank';

export const reorderItem: DbFunc<Opts, string> = async opts => {
  if (opts.fromPos <= 0 || opts.toPos <= 0) {
    return { success: false, message: 'Invalid position' };
  }

  if (opts.fromPos === opts.toPos) {
    return { success: false, message: 'Item is already in that position' };
  }

  try {
    const listRef = db.doc(`owners/${opts.ownerID}/lists/${opts.list}`) as DocRef<List>;
    const itemsRef = listRef.collection(`items`);

    const itemQuery = itemsRef
      .orderBy('rank')
      .offset(opts.fromPos - 1)
      .limit(1) as QueryRef<ListItem>;

    const surroundingItemsQuery = itemsRef
      .orderBy('rank')
      .offset(Math.max(beforeIdx(opts.toPos, opts.fromPos), 0)) // cannot pass in a negative number
      .limit(opts.toPos === 1 ? 1 : 2) as QueryRef<ListItem>; // there won't be a before item if moving to pos 1

    return db.runTransaction(async t => {
      const list = (await t.get(listRef)).data();

      if (!list) {
        return { success: false as const, message: `You don't have a list named ${msgFormat.code(opts.list)}.` };
      }

      if (list.isLocked) {
        return {
          success: false as const,
          message: `This list is currently locked for normalization. Please try again in a moment`,
        };
      }
      const itemDoc = (await t.get(itemQuery)).docs[0];

      if (!itemDoc) {
        return { success: false, message: 'Invalid "from" position' };
      }

      const surroundingItemDocs = (await t.get(surroundingItemsQuery)).docs;
      const itemBefore = opts.toPos === 1 ? null : surroundingItemDocs[0]?.data(); // null if inserting at beginning
      const itemAfter = surroundingItemDocs[opts.toPos === 1 ? 0 : 1]?.data(); // null if inserting at end

      if (!itemBefore && !itemAfter) {
        return { success: false, message: 'Invalid "to" position' };
      }

      const rankBefore = itemBefore?.rank;
      const rankAfter = itemAfter?.rank;
      const newRank = LexoRank.between(rankBefore, rankAfter);

      t.update(itemDoc.ref, {
        rank: newRank.toString(),
      });

      return { success: true, data: 'Item Moved!' };
    });
  } catch (e) {
    console.error({ e });
    return { success: false, message: 'Failed to add the item.' };
  }
};

// If the move will increase an item's rank,
// the item already in that position will be before it after the move
// otherwise, the item before the item in that position will be before it
const beforeIdx = (toPos: number, fromPos: number) => {
  return toPos > fromPos ? toPos - 1 : toPos - 2;
};

interface Opts {
  ownerID: string;
  list: string;
  fromPos: number;
  toPos: number;
}
