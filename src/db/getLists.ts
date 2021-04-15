import { db } from '../firebase';
import { List } from '../types/db';

export const getLists: GetLists = async ownerID => {
  const doc = await db.doc(`owners/${ownerID}`).get();

  if (!doc.exists) {
    return { success: false, message: "You don't have any lists" };
  }

  const lists = doc.get('lists') as List[];
  return { success: true, data: lists };
};

type GetLists = (ownerID: string) => Promise<{ success: false; message: string } | { success: true; data: List[] }>;
