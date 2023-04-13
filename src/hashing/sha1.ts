import * as crypto from "crypto";

export const sha1Hex = (input: string): string => {
    return crypto.createHash('sha1').update(input).digest('hex');
}
export const sha1Buffer = (input: string): Buffer => {
    return crypto.createHash('sha1').update(input).digest();
}
