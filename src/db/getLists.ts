import { db } from '../firebase';
import { CollRef, DB, DbFunc, List } from '../types/db';

export const getLists: DbFunc<Opts, DB<List>[]> = async opts => {
  let query = db
    .collection(`owners/${opts.ownerID}/lists`)
    .orderBy('createdAt')
    .offset(opts.start - 1)
    .limit(20) as CollRef<DB<List>>;

  const lists = (await query.get()).docs.map(d => d.data());

  if (lists.length === 0) {
    return { success: false, message: "You don't have any lists." };
  }

  return { success: true, data: lists };
};

interface Opts {
  ownerID: string;
  start: number;
}
