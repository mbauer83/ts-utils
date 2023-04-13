import {describe, expect, test} from '@jest/globals';
import { compareSize, CountablyInfinite, sizesAreEqual, UncountablyInfinite } from '../../src/size/size';

describe('size module', () => {
    test('CountablyInfinite is greater than any number in size comparison', () => {
        const maxInt = Number.MAX_SAFE_INTEGER;
        const compareResultIntToInf = compareSize(maxInt, CountablyInfinite);
        const compareResultInfToInt = compareSize(CountablyInfinite, maxInt);
        expect(compareResultIntToInf).toBe(-1);
        expect(compareResultInfToInt).toBe(1);
    });
    test('UncountablyInfinite is greater than any number in size comparison', () => {
        const maxInt = Number.MAX_SAFE_INTEGER;
        const compareResultIntToInf = compareSize(maxInt, UncountablyInfinite);
        const compareResultInfToInt = compareSize(UncountablyInfinite, maxInt);
        expect(compareResultIntToInf).toBe(-1);
        expect(compareResultInfToInt).toBe(1);
    });
    test('CountablyInfinite is equal to CountablyInfinite in size comparison', () => {
        const compareResult = compareSize(CountablyInfinite, CountablyInfinite);
        expect(compareResult).toBe(0);
    });
    test('UncountablyInfinite is equal to UncountablyInfinite in size comparison', () => {
        const compareResult = compareSize(UncountablyInfinite, UncountablyInfinite);
        expect(compareResult).toBe(0);
    });
    test('CountablyInfinite is less than UncountablyInfinite in size comparison', () => {
        const compareResult = compareSize(CountablyInfinite, UncountablyInfinite);
        expect(compareResult).toBe(-1);
    });
    test('UncountablyInfinite is greater than CountablyInfinite in size comparison', () => {
        const compareResult = compareSize(UncountablyInfinite, CountablyInfinite);
        expect(compareResult).toBe(1);
    });
    test('compareSize returns 0 for equal finite sizes', () => {
        const size1 = 5;
        const size2 = 5;
        const result = compareSize(size1, size2);
        expect(result).toBe(0);
    });
    test('compareSize returns -1 for finite size1 < finite size2', () => {
        const size1 = 5;
        const size2 = 6;
        const result = compareSize(size1, size2);
        expect(result).toBe(-1);
    });
    test('compareSize returns 1 for finite size1 > finite size2', () => {
        const size1 = 6;
        const size2 = 5;
        const result = compareSize(size1, size2);
        expect(result).toBe(1);
    });
    test('sizesAreEqual returns true for equal finite sizes', () => {
        const size1 = 5;
        const size2 = 5;
        const result = sizesAreEqual(size1, size2);
        expect(result).toBe(true);
    });
    test('sizesAreEqual returns false for unequal finite sizes', () => {
        const size1 = 5;
        const size2 = 6;
        const result = sizesAreEqual(size1, size2);
        expect(result).toBe(false);
    });
    test('sizesAreEqual returns true for equal infinite sizes', () => {
        const resultCountable = sizesAreEqual(CountablyInfinite, CountablyInfinite);
        const resultUncountable = sizesAreEqual(UncountablyInfinite, UncountablyInfinite);
        expect(resultCountable).toBe(true);
        expect(resultUncountable).toBe(true);
    });
    test('sizesAreEqual returns false for unequal infinite sizes', () => {
        const result = sizesAreEqual(CountablyInfinite, UncountablyInfinite);
        expect(result).toBe(false);
    });


});
