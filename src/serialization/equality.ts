import { EqualityComparable } from "../comparison/equality.js";
import { Serializable } from "./Serializable.js";

export interface SerializationEqualityComparable<in T extends Serializable> extends EqualityComparable<T> {}
