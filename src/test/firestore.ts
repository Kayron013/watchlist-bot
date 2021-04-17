import { addList } from '../db/addList';

export const addListTest = async () => {
  const res = await addList({
    name: 'movies',
    ownerID: '1231234231',
    description: 'list of movies',
    userID: '31242312',
  });
  console.log({ res });
};
