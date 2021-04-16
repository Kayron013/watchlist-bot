import { db } from '../firebase';
import { msgFormat } from '../utils/discord';

export const deleteItem: DeleteItem = async opts => {
  const query = db
    .collection(`owners/${opts.ownerID}/lists/${opts.list}/items`)
    .orderBy('createdAt')
    .offset(opts.itemNum - 1)
    .limit(1);
  const itemDocs = (await query.get()).docs;

  if (!itemDocs.length) {
    return { success: false, message: 'Invalid item' };
  }

  await itemDocs[0].ref.delete();

  return { success: true, data: `${msgFormat.code(opts.list)} has been deleted from ${msgFormat.code(opts.list)}.` };
};

interface Opts {
  list: string;
  itemNum: number;
  ownerID: string;
}

type DeleteItem = (opts: Opts) => Promise<{ success: false; message: string } | { success: true; data: string }>;
