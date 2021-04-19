import firebase from 'firebase-admin';

export interface ListOwner {
  ownerID: string;
  createdAt: Date;
}

export interface List {
  name: string;
  description: string;
  createdAt: Date;
  createdBy: string;
}

export interface ListItem {
  name: string;
  releaseDate?: Date;
  createdBy: string;
  createdAt: Date;
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
export type CollRef<T> = firebase.firestore.Query<T>;
