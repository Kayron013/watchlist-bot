/** `Object.entries` with typed keys */
export const entriesOf = Object.entries as <T extends Object, K extends keyof T>(obj: T) => [K, T[K]][];

/** `Object.keys` with typed keys */
export const keysOf = Object.keys as <T extends Object>(obj: T) => (keyof T)[];
