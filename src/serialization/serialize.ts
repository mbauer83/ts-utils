import { Serializable } from "./Serializable.js";

export const serialize: (s: Serializable) => string = s => JSON.stringify(s);