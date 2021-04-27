// @ts-nocheck
import { addItem } from '../db';
import { addList } from '../db/addList';

export const firestoreTest = async () => {
  await tAddListItems();
};

const tAddList = async () => {
  const res = await addList({
    name: 'movies',
    ownerID: 'G-1231234231',
    description: 'list of movies',
    userID: '31242312',
  });
  console.log({ res });
};

const tAddListItems = async () => {
  let res = await addItem({
    item: 'Death Note',
    list: 'movies',
    ownerID: 'G-1231234231',
    userID: '31242312',
  });
  console.log({ res });

  res = await addItem({
    item: 'Thor: Ragnarok',
    list: 'movies',
    ownerID: 'G-1231234231',
    userID: '31242312',
  });
  console.log({ res });

  res = await addItem({
    item: 'Captain America: Winter Soldier',
    list: 'movies',
    ownerID: 'G-1231234231',
    userID: '31242312',
  });
  console.log({ res });
};
