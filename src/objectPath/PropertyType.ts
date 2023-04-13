import { Path } from "./Path";

export type PropertyType<
  S extends { [key: string|number|symbol]: any },
  K extends Path<S>
> = K extends `${infer U}.${infer Rest}`
? Rest extends Path<S[U]>
  ? PropertyType<S[U], Rest>
  : never
: S[K]