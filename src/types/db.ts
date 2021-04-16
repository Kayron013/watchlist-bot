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

/** Converts all object properties of type `Date` to type `Timestamp` which is returned from firestore */
export type DB<T extends Object> = {
  [K in keyof T]: T[K] extends Date ? Timestamp : T[K] extends Object ? DB<T[K]> : T[K];
};

type Timestamp = firebase.firestore.Timestamp;
