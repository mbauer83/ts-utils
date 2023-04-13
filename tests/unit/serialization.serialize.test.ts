import {describe, expect, test} from '@jest/globals';
import { serialize } from '../../src/serialization/serialize';
import { SERIALIZED_ARRAY, SERIALIZED_BOOLEAN, SERIALIZED_BUFFER, SERIALIZED_DATE, SERIALIZED_JSON_SERIALIZABLE, SERIALIZED_NULL, SERIALIZED_NUMBER, SERIALIZED_STRING } from '../expectations/serialize';
import { SERIALIZABLE_ARRAY, SERIALIZABLE_BOOLEAN, SERIALIZABLE_BUFFER, SERIALIZABLE_DATE, SERIALIZABLE_JSON_SERIALIZABLE, SERIALIZABLE_NULL, SERIALIZABLE_NUMBER, SERIALIZABLE_STRING } from '../fixtures/serialize';

describe('serialization module', () => {
    test('correctly serializes null', () => {
      expect(serialize(SERIALIZABLE_NULL)).toBe(SERIALIZED_NULL);;
    });
    test('correctly serializes boolean', () => {
      expect(serialize(SERIALIZABLE_BOOLEAN)).toBe(SERIALIZED_BOOLEAN);
    });
    test('correctly serializes number', () => {
      expect(serialize(SERIALIZABLE_NUMBER)).toBe(SERIALIZED_NUMBER);
    });
    test('correctly serializes date', () => {
      expect(serialize(SERIALIZABLE_DATE)).toBe(SERIALIZED_DATE);
    });
    test('correctly serializes string', () => {
      expect(serialize(SERIALIZABLE_STRING)).toBe(SERIALIZED_STRING);
    });
    test('correctly serializes buffer', () => {
      expect(serialize(SERIALIZABLE_BUFFER)).toBe(SERIALIZED_BUFFER);
    });
    test('correctly serializes array', () => {
      expect(serialize(SERIALIZABLE_ARRAY)).toBe(SERIALIZED_ARRAY);
    });
    test('correctly serializes object with toJSON method', () => {
        expect(serialize(SERIALIZABLE_JSON_SERIALIZABLE)).toBe(SERIALIZED_JSON_SERIALIZABLE);
    });
  });