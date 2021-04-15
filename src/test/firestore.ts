import { addList } from '../db/addList';

export const addListTest = async () => {
  const res = await addList({ name: 'movies', guildID: '1231234231', description: 'list of movies' });
  console.log({ res });
};
