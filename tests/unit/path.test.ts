import {describe, expect, test} from "@jest/globals";
import {Path} from '../../src/objectPath/Path';

describe('test Path', () => {
    class B {
        constructor(
            public readonly c: string,
            public readonly d: number,
        ) {}
    }

    class A {
        constructor(
            public readonly a: Date,
            public readonly b: B,
        ) {}
    }

    const someB = new B('hello', 47);
    const someA = new A(new Date(), someB);
    const funcFromPath = <A, P extends Path<A>>(a: A, p: P) => undefined;

    test('Path can index object', () => {
        expect(() => {
            //@ts-expect-error
            const invalidPath: Path<A> = 'x';
            const validPath: Path<A> = 'a';
            //@ts-expect-error
            funcFromPath(someA, 'x');
            funcFromPath(someA, 'a');
        }).not.toThrowError()
    })

    test('Path can index nested object', () => {
        expect(() => {
            //@ts-expect-error
            const invalidPath: Path<A> = 'b.e';
            const validPath: Path<A> = 'b.c';
            //@ts-expect-error
            funcFromPath(someA, 'b.e');
            funcFromPath(someA, 'b.c');
        }).not.toThrowError()
    })

});