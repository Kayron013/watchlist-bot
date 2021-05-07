import { firestore, initializeApp } from 'firebase-admin';

initializeApp();
export const db = firestore();
