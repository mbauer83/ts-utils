import {describe, expect, test} from "@jest/globals";
import {DateRange} from '../../src/date/DateRange';

describe('test DateRange', () => {

    test('Open DateRange can be constructed', () => {
        let dateRange: DateRange | null = null;
        expect(() => {
          dateRange = new DateRange()
        }).not.toThrowError()
        expect(dateRange).toBeInstanceOf(DateRange);
    })

    test('Left-open DateRange can be constructed', () => {
        let dateRange: DateRange | null = null;
        expect(() => {
            dateRange = new DateRange(undefined, new Date())
        }).not.toThrowError()
        expect(dateRange).toBeInstanceOf(DateRange);
    })

    test('Right-open DateRange can be constructed', () => {
        let dateRange: DateRange | null = null;
        expect(() => {
            dateRange = new DateRange(new Date(), undefined)
        }).not.toThrowError()
        expect(dateRange).toBeInstanceOf(DateRange);
    })

    test('DateRange throws on attempt to construct with fromDate after toDate', () => {
        let dateRange: DateRange | null = null;
        const beforeDate = new Date();
        const afterDate = new Date(beforeDate.getTime() + 500);
        expect(() => {
            dateRange = new DateRange(afterDate, beforeDate)
        }).toThrowError();
    })

    test('DateRange can be constructed with fromDate before toDate', () => {
        let dateRange: DateRange | null = null;
        const beforeDate = new Date();
        const afterDate = new Date(beforeDate.getTime() + 500);
        expect(() => {
            dateRange = new DateRange(beforeDate, afterDate)
        }).not.toThrowError();
        expect(dateRange).toBeInstanceOf(DateRange);
    })

    test('DateRange can be constructed with fromDate equal to toDate', () => {
        let dateRange: DateRange | null = null;
        const date = new Date();
        expect(() => {
            dateRange = new DateRange(date, date)
        }).not.toThrowError();
        expect(dateRange).toBeInstanceOf(DateRange);
    })

    test('Any timestamp is within [..., ...]', () => {
        const range = new DateRange();
        expect(range.isInRange(0));
        expect(range.isInRange((new Date()).getTime()));
        expect(range.isInRange(Number.MAX_SAFE_INTEGER));
    })

    test('Any Date is within [..., ...]', () => {
        const range = new DateRange();
        expect(range.isInRange(new Date(0)));
        expect(range.isInRange(new Date()));
        expect(range.isInRange(new Date(Number.MAX_SAFE_INTEGER)));
    })

    test('Any timestamp is within (..., ...)', () => {
        const range = new DateRange(undefined, undefined, true, true);
        expect(range.isInRange(0));
        expect(range.isInRange((new Date()).getTime()));
        expect(range.isInRange(Number.MAX_SAFE_INTEGER));
    })

    test('Any Date is within (..., ...)', () => {
        const range = new DateRange(undefined, undefined, true, true);
        expect(range.isInRange(new Date(0)));
        expect(range.isInRange(new Date()));
        expect(range.isInRange(new Date(Number.MAX_SAFE_INTEGER)));
    })

    test('Inclusive lower bound is respected', () => {
        const date = new Date();
        const earlierDate = new Date(date.getTime() - 100);
        const laterDate = new Date(date.getTime() + 100);
        const range = new DateRange(date, undefined, true);
        expect(range.isInRange(date)).toBe(true);
        expect(range.isInRange(laterDate)).toBe(true);
        expect(range.isInRange(earlierDate)).toBe(false);
        expect(range.isInRange(date.getTime())).toBe(true);
        expect(range.isInRange(laterDate.getTime())).toBe(true);
        expect(range.isInRange(earlierDate.getTime())).toBe(false);
    })

    test('Exclusive lower bound is respected', () => {
        const date = new Date();
        const earlierDate = new Date(date.getTime() - 100);
        const laterDate = new Date(date.getTime() + 100);
        const range = new DateRange(date, undefined);
        expect(range.isInRange(date)).toBe(false);
        expect(range.isInRange(laterDate)).toBe(true);
        expect(range.isInRange(earlierDate)).toBe(false);
        expect(range.isInRange(date.getTime())).toBe(false);
        expect(range.isInRange(laterDate.getTime())).toBe(true);
        expect(range.isInRange(earlierDate.getTime())).toBe(false);
    })

    test('Inclusive upper bound is respected', () => {
        const date = new Date();
        const earlierDate = new Date(date.getTime() - 100);
        const laterDate = new Date(date.getTime() + 100);
        const range = new DateRange(undefined, date, false, true);
        expect(range.isInRange(date)).toBe(true);
        expect(range.isInRange(laterDate)).toBe(false);
        expect(range.isInRange(earlierDate)).toBe(true);
        expect(range.isInRange(date.getTime())).toBe(true);
        expect(range.isInRange(laterDate.getTime())).toBe(false);
        expect(range.isInRange(earlierDate.getTime())).toBe(true);
    })

    test('Exclusive upper bound is respected', () => {
        const date = new Date();
        const earlierDate = new Date(date.getTime() - 100);
        const laterDate = new Date(date.getTime() + 100);
        const range = new DateRange(undefined, date);
        expect(range.isInRange(date)).toBe(false);
        expect(range.isInRange(laterDate)).toBe(false);
        expect(range.isInRange(earlierDate)).toBe(true);
        expect(range.isInRange(date.getTime())).toBe(false);
        expect(range.isInRange(laterDate.getTime())).toBe(false);
        expect(range.isInRange(earlierDate.getTime())).toBe(true);
    })

    test('static empty member is empty DateRange', () => {
        expect(DateRange.empty).toBeInstanceOf(DateRange);
        expect(DateRange.empty.fromDate).toBe(undefined);
        expect(DateRange.empty.toDate).toBe(undefined);
    })

    test('hasLowerBound reports correctly', () => {
        expect(new DateRange().hasLowerBound()).toBe(false);
        expect(new DateRange(new Date()).hasLowerBound()).toBe(true);
        expect(new DateRange(undefined, new Date()).hasLowerBound()).toBe(false);
        expect(new DateRange(new Date(), new Date()).hasLowerBound()).toBe(true);
    })

    test('hasUpperBound reports correctly', () => {
        expect(new DateRange().hasUpperBound()).toBe(false);
        expect(new DateRange(undefined, new Date()).hasUpperBound()).toBe(true);
        expect(new DateRange(new Date(), undefined).hasUpperBound()).toBe(false);
        expect(new DateRange(new Date(), new Date()).hasUpperBound()).toBe(true);
    })

    test('toString returns correct string', () => {
        // Should use '(' / ')' for exclusive bounds and '[' / ']' for inclusive bounds.
        // Should use '...' for undefined bounds and ISO 8601 for defined bounds.
        expect(new DateRange().toString()).toBe('(..., ...)');
        expect(new DateRange(undefined, undefined, true, true).toString()).toBe('[..., ...]');
        const currDate = new Date();
        const expectedDateString = currDate.toISOString();
        expect(new DateRange(currDate).toString()).toBe(`(${expectedDateString}, ...)`);
        expect(new DateRange(undefined, currDate).toString()).toBe(`(..., ${expectedDateString})`);
        expect(new DateRange(currDate, undefined, true, true).toString()).toBe(`[${expectedDateString}, ...]`);
        expect(new DateRange(undefined, currDate, true, true).toString()).toBe(`[..., ${expectedDateString}]`);
        expect(new DateRange(currDate, undefined, true, false).toString()).toBe(`[${expectedDateString}, ...)`);
        expect(new DateRange(currDate, undefined, false, true).toString()).toBe(`(${expectedDateString}, ...]`);
        expect(new DateRange(undefined, currDate, true, false).toString()).toBe(`[..., ${expectedDateString})`);
        expect(new DateRange(undefined, currDate, false, true).toString()).toBe(`(..., ${expectedDateString}]`);        
        expect(new DateRange(currDate, currDate).toString()).toBe(`(${expectedDateString}, ${expectedDateString})`);
        expect(new DateRange(currDate, currDate, true, true).toString()).toBe(`[${expectedDateString}, ${expectedDateString}]`);
    });
});