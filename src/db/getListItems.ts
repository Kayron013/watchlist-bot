import { db } from '../firebase';
import { DB, ListItem } from '../types/db';

export const getListItems: GetListItems = async opts => {
  let query = db
    .collection(`owners/${opts.ownerID}/lists/${opts.list}/items`)
    .orderBy('createdAt')
    .offset(opts.start - 1)
    .limit(20);

  const lists = (await query.get()).docs.map(d => d.data() as DB<ListItem>);

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
type GetListItems = (
  otps: Opts
) => Promise<{ success: false; message: string } | { success: true; data: DB<ListItem>[] }>;
