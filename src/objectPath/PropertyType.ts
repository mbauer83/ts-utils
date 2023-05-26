import { Path } from "./Path.js";

export type PropertyType<S, K extends Path<S>> =
    K extends keyof S ?
        S[K] :
        K extends `${infer U}.${infer Rest}` ?
            U extends keyof S ?
                Rest extends Path<S[U]> ?
                    PropertyType<S[U], Rest> :
                    S[U] :
                never :
            never;
