import { db } from '../firebase';
import { msgFormat } from '../utils/discord';

export const deleteList: GetLists = async opts => {
  const listRef = db.doc(`owners/${opts.ownerID}/lists/${opts.name}`);
  const listDoc = await listRef.get();

  if (!listDoc.exists) {
    return { success: false, message: `There is no list named ${msgFormat.code(opts.name)}` };
  }

  await listRef.delete();

  return { success: true, data: `List ${msgFormat.code(opts.name)} has been deleted.` };
};

interface Opts {
  name: string;
  ownerID: string;
}

type GetLists = (opts: Opts) => Promise<{ success: false; message: string } | { success: true; data: string }>;
