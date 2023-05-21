import { HasSize } from "./HasSize.js";

export interface HasCount extends HasSize {
    getSize(): number
}