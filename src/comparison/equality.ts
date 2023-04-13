export interface EqualityComparable<in T> {
    equals(other: T): boolean;
}

export type EqualityComparison<in T> = (a: T, b: T) => boolean;

export interface EqualityComparator<in T> {
    areEqual: EqualityComparison<T>;
}
