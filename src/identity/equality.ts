import { EqualityComparable } from "../comparison/equality.js";
import { Id } from "./Id.js";

export interface IdEqualityComparable<in T extends {[key: string]: Id}> extends EqualityComparable<T> {
    id: Id;
    isEqualById(other: T): boolean;
}

export const areEqualById = <T extends IdEqualityComparable<any>>(a: T, b: T): boolean => {
    return a.id.equals(b.id);
}
