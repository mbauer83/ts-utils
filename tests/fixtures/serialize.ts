export const SERIALIZABLE_NULL = null;
export const SERIALIZABLE_BOOLEAN = true;
export const SERIALIZABLE_NUMBER = 42;
export const SERIALIZABLE_DATE = new Date("6543-02-01T12:34:56.789Z");
export const SERIALIZABLE_STRING = "Hello, World!";
export const SERIALIZABLE_BUFFER = Buffer.from("Hello, World!");
export const SERIALIZABLE_ARRAY = [SERIALIZABLE_NULL, SERIALIZABLE_BOOLEAN, SERIALIZABLE_NUMBER, SERIALIZABLE_DATE, SERIALIZABLE_STRING, SERIALIZABLE_BUFFER];
export const SERIALIZABLE_JSON_SERIALIZABLE = {
    toJSON() {
        return {
            "null": SERIALIZABLE_NULL,
            "boolean": SERIALIZABLE_BOOLEAN,
            "number": SERIALIZABLE_NUMBER,
            "date": SERIALIZABLE_DATE,
            "string": SERIALIZABLE_STRING,
            "buffer": SERIALIZABLE_BUFFER,
            "array": SERIALIZABLE_ARRAY            
        }
    }
}
