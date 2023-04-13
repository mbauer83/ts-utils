import { Serializable } from "child_process";
import { EqualityComparable } from "../comparison/equality";

export interface SerializationEqualityComparable<in T extends Serializable> extends EqualityComparable<T> {}
