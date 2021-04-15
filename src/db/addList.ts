import { db, FieldValue } from '../firebase';
import { List } from '../types/db';

export const addList: AddList = async opts => {
  const ownerPath = `/owners/${opts.ownerID}`;
  const owner = await db.doc(ownerPath).get();

  if (owner.exists) {
    const lists = owner.get('lists') as List[];
    const exists = Boolean(lists.find(l => l.name === opts.name));

    if (exists) {
      return { success: false, message: 'This list already exists' };
    }

    await owner.ref.update({
      lists: FieldValue.arrayUnion({
        name: opts.name,
        description: opts.description,
      }),
    });
    return { success: true, data: 'List Added!' };
  } else {
    await owner.ref.set({
      ownerID: opts.ownerID,
      lists: [
        {
          name: opts.name,
          description: opts.description || '',
        },
      ] as List[],
    });
    return { success: true, data: 'List Added!' };
  }
};

interface Opts {
  name: string;
  description?: string;
  ownerID: string;
}
type AddList = (opts: Opts) => Promise<{ success: false; message: string } | { success: true; data: string }>;
