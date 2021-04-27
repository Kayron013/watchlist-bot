import { db } from '../firebase';
import { QueryRef, DB, DbFunc, ListItem } from '../types/db';

export const getListItems: DbFunc<Opts, DB<ListItem>[]> = async opts => {
  let query = db
    .collection(`owners/${opts.ownerID}/lists/${opts.list}/items`)
    .orderBy('createdAt')
    .offset(opts.start - 1)
    .limit(20) as QueryRef<DB<ListItem>>;

  const lists = (await query.get()).docs.map(d => d.data());

  if (lists.length === 0) {
    return { success: false, message: 'No items found.' };
  }

  return { success: true, data: lists };
};

interface Opts {
  ownerID: string;
  list: string;
  start: number;
}
