import {CError, StringMethod} from "./err";

export class CAssert {

    constructor(public readonly ctx?: {
        fnLog?: (msg: string) => void
    }) {
    }

    private log(msg: string) {
        if (!this.ctx || !this.ctx.fnLog) {
            return;
        }
        this.ctx.fnLog(msg);
    }

    cok<T>(condition: T, code: number, msg: string | Error | StringMethod) {
        return this.cOk(condition, code, msg);
    }

    cThrow(code: number, msg: string | Error | StringMethod) {
        let msgStr: string = "";
        let err = msg;
        if (typeof msg === "string") {
            msgStr = msg;
            err = new CError(code, msgStr);
        } else if (msg instanceof Error) {
            err = new CError(code, msg as Error);
            msgStr = code + ": " + err.message + " stack: " + err.stack;
        } else {
            msgStr = (msg as StringMethod)();
            err = new CError(code, msgStr);
        }
        this.log(msgStr);
        throw err;
    }

    cOk<T>(condition: T, code: number, msg: string | Error | StringMethod) {
        if (condition instanceof Promise) {
            throw new Error("assert condition cannot be a promise");
        }

        if (condition) {
            return;
        }

        return this.cThrow(code, msg);
    }

    cNotNullAndUndefined(obj: any, code: number, msg: string | Error | StringMethod) {
        return this.cok(obj !== undefined && obj !== null, code, msg);
    }

    cStrictEqual<T>(a: T, b: T, code: number, msg: string | Error | StringMethod) {
        return this.cok(a === b, code, msg);
    }

    cNotStrictEqual<T>(a: T, b: T, code: number, msg: string | Error | StringMethod) {
        return this.cok(a !== b, code, msg);
    }

    /**
     * @deprecated
     */
    ok<T>(condition: T, msg: string | Error | StringMethod) {
        if (condition instanceof Promise) {
            throw new Error("assert condition cannot be a promise");
        }

        if (condition) {
            return;
        }

        let msgStr: string = "";
        if (typeof msg === "string") {
            msgStr = msg;
            msg = new Error(msgStr);
        } else if (msg instanceof CError) {
            const err = (msg as CError);
            msgStr = err.code + ": " + err.message + " stack: " + err.stack;
        } else if (msg instanceof Error) {
            const err = (msg as Error);
            msgStr = err.message + " stack: " + err.stack;
        } else {
            msgStr = (msg as StringMethod)();
            msg = new Error(msgStr);
        }
        this.log(msgStr);
        throw msg;
    }

    /**
     * @deprecated
     */
    sEqual<T>(a: T, b: T, msg: string | Error | StringMethod) {
        return this.ok(a === b, msg);
    }

    /**
     * @deprecated
     */
    sNotEqual<T>(a: T, b: T, msg: string | Error | StringMethod) {
        return this.ok(a !== b, msg);
    }
}
