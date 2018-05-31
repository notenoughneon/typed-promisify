export function promisify<T>(f: (cb: (err: any, res: T) => void) => void, thisContext?: any): () => Promise<T>;
export function promisify<A, T>(f: (arg: A, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A) => Promise<T>;
export function promisify<A, A2, T>(f: (arg: A, arg2: A2, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A, arg2: A2) => Promise<T>;
export function promisify<A, A2, A3, T>(f: (arg: A, arg2: A2, arg3: A3, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A, arg2: A2, arg3: A3) => Promise<T>;
export function promisify<A, A2, A3, A4, T>(f: (arg: A, arg2: A2, arg3: A3, arg4: A4, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A, arg2: A2, arg3: A3, arg4: A4) => Promise<T>;
export function promisify<A, A2, A3, A4, A5, T>(f: (arg: A, arg2: A2, arg3: A3, arg4: A4, arg5: A5, cb: (err: any, res: T) => void) => void, thisContext?: any): (arg: A, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Promise<T>;

export function promisify(f: any, thisContext?: any) {
    return function () {
        let args = Array.prototype.slice.call(arguments);
        return new Promise((resolve, reject) => {
            args.push((err: any, result: any) => err !== null ? reject(err) : resolve(result));
            f.apply(thisContext, args);
        });
    }
}

export function map<T, U>(elts: PromiseLike<PromiseLike<T>[]>, f: (t: T) => U | PromiseLike<U>): Promise<U[]>;
export function map<T, U>(elts: PromiseLike<T[]>, f: (t: T) => U | PromiseLike<U>): Promise<U[]>;
export function map<T, U>(elts: PromiseLike<T>[], f: (t: T) => U | PromiseLike<U>): Promise<U[]>;
export function map<T, U>(elts: T[], f: (t: T) => U | PromiseLike<U>): Promise<U[]>;

export function map(elts: any, f: any) {
    let apply = (appElts: any) => Promise.all(appElts.map((elt: any) => typeof elt.then === 'function' ? elt.then(f) : f(elt)));
    return typeof elts.then === 'function' ? elts.then(apply) : apply(elts);
}

export function _try<T>(f: () => T): Promise<T>;
export function _try<T>(f: (arg: any) => T, arg: any): Promise<T>;
export function _try<T>(f: (arg: any, arg2: any) => T, arg: any, arg2: any): Promise<T>;
export function _try<T>(f: (arg: any, arg2: any, arg3: any) => T, arg: any, arg2: any, arg3: any): Promise<T>;
export function _try<T>(f: (arg: any, arg2: any, arg3: any, arg4: any) => T, arg: any, arg2: any, arg3: any, arg4: any): Promise<T>;

export function _try(f: any, thisContext?: any) {
    let args = Array.prototype.slice.call(arguments);
    return new Promise((res, rej) => {
        try {
            args.shift();
            res(f.apply(thisContext, args));
        } catch (err) {
            rej(err);
        }
    });
}
