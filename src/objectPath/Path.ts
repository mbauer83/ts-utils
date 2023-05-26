type IsAny<T> = unknown extends T ? ([keyof T] extends [never] ? false : true) : false

type ExcludeArrayKeys<T> = T extends ArrayLike<any> ? Exclude<keyof T, keyof any[]> : keyof T

type PathImpl<S, Key extends keyof S>
    = Key extends string ?
        IsAny<S[Key]> extends true ?
            never :
            S[Key] extends object ?
                | `${Key}.${PathImpl<S[Key], ExcludeArrayKeys<S[Key]>> & string}`
                | `${Key}.${ExcludeArrayKeys<S[Key]> & string}` :
            never :
        never;

export type Path<S>
    = keyof S extends string ?
        (PathImpl<S, keyof S>| keyof S) extends infer P ?
            P extends string | keyof S ?
                P :
                keyof S :
            keyof S :
        never;
