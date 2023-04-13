export type CountablyInfinite = 'CINF';
export const CountablyInfinite: CountablyInfinite = 'CINF';
export type UncountablyInfinite = 'UINF';
export const UncountablyInfinite: UncountablyInfinite = 'UINF';

export type Size = number | CountablyInfinite | UncountablyInfinite;

export function compareSize(a: Size, b: Size): number {
    const aIsInfinite = a === CountablyInfinite || a === UncountablyInfinite;
    const bIsInfinite = b === CountablyInfinite || b === UncountablyInfinite;
    if (!aIsInfinite && !bIsInfinite) {
        if (a === b) {
            return 0;
        }
        return a > b ? 1 : -1;
    }
    if (aIsInfinite && bIsInfinite) {
        return a === b ? 0 : a === UncountablyInfinite ? 1 : -1;
    }
    if (aIsInfinite) {
        return 1;
    }
    // b is infinite, a is finite
    return -1;
}

export function sizesAreEqual(a: Size, b: Size): boolean {
    return compareSize(a, b) === 0;
}