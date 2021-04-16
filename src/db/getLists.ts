import { db } from '../firebase';
import { List } from '../types/db';

export const getLists: GetLists = async opts => {
  let query = db
    .collection(`owners/${opts.ownerID}/lists`)
    .orderBy('createdAt')
    .offset(opts.start - 1)
    .limit(20);

  const lists = (await query.get()).docs.map(d => d.data() as List);

  if (lists.length === 0) {
    return { success: false, message: "You don't have any lists." };
  }

  return { success: true, data: lists };
};

interface Opts {
  ownerID: string;
  start: number;
}
type GetLists = (otps: Opts) => Promise<{ success: false; message: string } | { success: true; data: List[] }>;
