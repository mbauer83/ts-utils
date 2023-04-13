import { HasSize } from "./HasSize";

export interface HasCount extends HasSize {
    getSize(): number
}