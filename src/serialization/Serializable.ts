import { JSONSerializable } from "./JSONSerializable.js";

export type Serializable = null | boolean | number | Date | string | Buffer | JSONSerializable | Serializable[] | { [key: string|number]: Serializable };