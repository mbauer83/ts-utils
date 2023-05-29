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
});