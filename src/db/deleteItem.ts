import { db } from '../firebase';
import { QueryRef, DbFunc, ListItem } from '../types/db';
import { msgFormat } from '../utils/discord';

export const deleteItem: DbFunc<Opts, string> = async opts => {
  const query = db
    .collection(`owners/${opts.ownerID}/lists/${opts.list}/items`)
    .orderBy('createdAt')
    .offset(opts.itemNum - 1)
    .limit(1) as QueryRef<ListItem>;

  const itemDocs = (await query.get()).docs;

  if (!itemDocs.length) {
    return { success: false, message: 'Invalid item' };
  }

  const item = itemDocs[0].data();

  await itemDocs[0].ref.delete();

  return { success: true, data: `${msgFormat.code(item.name)} has been deleted from ${msgFormat.code(opts.list)}.` };
};

interface Opts {
  list: string;
  itemNum: number;
  ownerID: string;
}
