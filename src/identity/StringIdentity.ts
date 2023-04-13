import { Id } from "./Id";

export class StringIdentity implements Id {
    constructor(public readonly id: string) {}
    toJSON() {
        return { type: "StringIdentity", id: this.id };
    }
    equals(other: Id): boolean {
        return other instanceof StringIdentity && this.id === other.id;
    }
}
