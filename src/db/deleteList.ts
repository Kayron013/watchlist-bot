import { db } from '../firebase';
import { DbFunc, DocRef, List } from '../types/db';
import { msgFormat } from '../utils/discord';

export const deleteList: DbFunc<Opts, string> = async opts => {
  const listRef = db.doc(`owners/${opts.ownerID}/lists/${opts.name}`) as DocRef<List>;

  return db.runTransaction(async t => {
    const list = (await t.get(listRef)).data();

    if (!list) {
      return { success: false as const, message: `You don't have a list named ${msgFormat.code(opts.name)}.` };
    }

    if (list.isLocked) {
      return {
        success: false as const,
        message: `This list is currently locked for normalization. Please try again in a moment`,
      };
    }

    t.delete(listRef);

    return { success: true, data: `List ${msgFormat.code(opts.name)} has been deleted.` };
  });
};

interface Opts {
  name: string;
  ownerID: string;
}
