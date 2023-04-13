export function conditionalDo<T>(condition: boolean | (() => boolean), action: (...args: any) => T, ...args: any): T | undefined {
    if (typeof condition === "function") {
        condition = condition();
    }
    if (condition) {
        return action(...args);
    }
    return undefined;
}
