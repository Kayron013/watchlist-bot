import { db } from '../firebase';
import { DB, DbFunc, DocRef, List } from '../types/db';
import { msgFormat } from '../utils/discord';

export const getList: DbFunc<Opts, DB<List>> = async opts => {
  let query = db.doc(`owners/${opts.ownerID}/lists`) as DocRef<DB<List>>;

  const list = (await query.get()).data();

  if (!list) {
    return { success: false, message: `You don't have a list named ${msgFormat.code(opts.name)}.` };
  }

  return { success: true, data: list };
};

interface Opts {
  ownerID: string;
  name: string;
}
