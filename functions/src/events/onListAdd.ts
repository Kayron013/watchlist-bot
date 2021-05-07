import { firestore } from 'firebase-admin';
import { firestore as f, logger } from 'firebase-functions';
import { db } from '../utils/firebase';
import LexoRank from '../utils/LexoRank/src';

const RANK_THRESHOLD = 10;
const BATCH_SIZE = 100;

export const maybeNormalizeListItems = f.document('owners/{owner}/lists/{list}/items/{item}').onWrite(async change => {
  try {
    const item = change.after.data();
    if (!item) return; // was deleted
    if (item.rank.length < RANK_THRESHOLD) return;

    const listRef = change.after.ref.parent.parent!;
    await listRef.update({ isLocked: true });

    const oldBucket = (await listRef.get()).get('bucket') as string;
    const newBucket = LexoRank.nextBucket(oldBucket);

    // a character just greater than the highest rank in the old bucket
    const bucketCap = String.fromCharCode(oldBucket.charCodeAt(0) + 1);

    const itemsQuery = listRef
      .collection('items')
      .where('rank', '>', oldBucket)
      .where('rank', '<', bucketCap)
      .limit(BATCH_SIZE);

    await new Promise((resolve, reject) =>
      normalizeList(itemsQuery, new LexoRank('1', newBucket), resolve).catch(reject)
    );

    await listRef.update({ isLocked: false, bucket: newBucket });

    logger.log(`Normalized items for list at ${listRef.path}`);
  } catch (error) {
    logger.debug('Caught Error');
    logger.error(error);
  }
});

const normalizeList = async (query: firestore.Query, startingRank: LexoRank, resolve: (value?: unknown) => void) => {
  const snap = await query.get();
  const batchSize = snap.size;

  if (batchSize === 0) {
    resolve();
    return;
  }

  const batch = db.batch();
  let rank = startingRank;

  snap.docs.forEach(doc => {
    batch.update(doc.ref, { rank: rank.toString() });
    rank = rank.increment();
  });

  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    normalizeList(query, rank, resolve);
  });
};
