import { EqualityComparable } from "../comparison/equality.js";
import { JSONSerializable } from "../serialization/JSONSerializable.js";

export interface Id extends JSONSerializable, EqualityComparable<Id> {}
