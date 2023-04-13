import {describe, expect, test} from '@jest/globals';
import { EMPTY_STRING_SHA1, NONEMPTY_STRING_SHA1 } from '../expectations/sha1';
import { EMPTY_STRING, NONEMPTY_STRING } from '../fixtures/sha1';
import {sha1Hex, sha1Buffer} from './../../src/hashing/sha1';

describe('sha1 module', () => {
  test('produces correct sha1 hash in hex form', () => {
    expect(sha1Hex(EMPTY_STRING)).toBe(EMPTY_STRING_SHA1);
    expect(sha1Hex(NONEMPTY_STRING)).toBe(NONEMPTY_STRING_SHA1);
  });
  test('produces correct sha1 hash in buffer form', () => {
    expect(sha1Buffer(EMPTY_STRING).toString('hex')).toBe(EMPTY_STRING_SHA1);
    expect(sha1Buffer(NONEMPTY_STRING).toString('hex')).toBe(NONEMPTY_STRING_SHA1);
  });
});