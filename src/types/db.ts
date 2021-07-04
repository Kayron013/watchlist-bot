import firebase from 'firebase-admin';

export interface ListOwner {
  ownerID: string;
  listNum: number;
}

export interface List {
  name: string;
  description: string;
  createdAt: Date;
  createdBy: string;
  bucket: string;
  isLocked: boolean;
  length: number;
}

export interface ListItem {
  name: string;
  releaseDate?: Date;
  createdBy: string;
  createdAt: Date;
  rank: string;
}

export type DbFunc<T extends {}, V> = (
  otps: T
) => Promise<{ success: false; message: string } | { success: true; data: V }>;

/** Converts all object properties of type `Date` to type `Timestamp` which is returned from firestore */
export type DB<T extends Object> = {
  [K in keyof T]: T[K] extends Date | undefined ? Timestamp : T[K] extends Object ? DB<T[K]> : T[K];
};

type Timestamp = firebase.firestore.Timestamp;

export type DocRef<T> = firebase.firestore.DocumentReference<T>;
export type CollRef<T> = firebase.firestore.CollectionReference<T>;
export type QueryRef<T> = firebase.firestore.Query<T>;
