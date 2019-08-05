'use strict';

export type StringMethod = () => string;

export class Err<T> extends Error {

    constructor(public readonly code: T, msg: string | Error | StringMethod) {
        super(
            (typeof msg === "string")
                ? msg
                : ((msg instanceof Error)
                ? msg.message : msg())
        );
        Object.setPrototypeOf(this, this.constructor.prototype);
        this.name = this.constructor.name;
    }
}

export class CError extends Err<string | number> {
}
