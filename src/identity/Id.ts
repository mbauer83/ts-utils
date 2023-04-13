import { EqualityComparable } from "../comparison/equality";
import { JSONSerializable } from "../serialization/JSONSerializable";

export interface Id extends JSONSerializable, EqualityComparable<Id> {}
