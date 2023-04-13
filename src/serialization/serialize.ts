import { Serializable } from "./Serializable";

export const serialize: (s: Serializable) => string = s => JSON.stringify(s);