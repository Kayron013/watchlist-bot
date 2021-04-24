/** Takes a type param, `T`, and returns a function that can infer the narrow type of a type `T` parameter*/
export const narrowType = <T extends any>() => <N extends T>(param: N) => param;
