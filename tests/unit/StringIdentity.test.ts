import {describe, expect, test} from '@jest/globals';
import { StringIdentity } from '../../src/identity/StringIdentity';

describe('StringIdentity class', () => {
    const stringId: StringIdentity = new StringIdentity('test');
    test('correctly implements Id interface', () => {
        expect(stringId).toHaveProperty('toJSON');
        expect(stringId).toHaveProperty('equals');
        expect(stringId.toJSON()).toEqual({ type: "StringIdentity", id: "test" });
        expect(stringId.equals(new StringIdentity('test'))).toBe(true);
    });
});
