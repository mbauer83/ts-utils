import {describe, expect, test} from '@jest/globals';
import { conditionalDo } from '../../src/controlFlow/conditionalDo';

describe('conditionDo function', () => {
    let result: boolean|null = null;
    const setToTrue = () => result = true;
    test('executes the action on boolean true conditional', () => {
        conditionalDo(true, setToTrue);
        expect(result).toBe(true);
        result = null;
    });
    test('executes the function on lazy boolean true conditional', () => {
        conditionalDo(() => true, setToTrue);
        expect(result).toBe(true);
        result = null;
    });
    test('uses args to execute the action', () => {
        conditionalDo(true, (arg: boolean) => result = arg, false);
        expect(result).toBe(false);
        result = null;
    });
    test('does not execute action on boolean false conditional', () => {
        conditionalDo(false, setToTrue);
        expect(result).toBe(null);
    });
    test('does not execute action on lazy boolean false conditional', () => {
        conditionalDo(() => false, setToTrue);
        expect(result).toBe(null);
    });
});
