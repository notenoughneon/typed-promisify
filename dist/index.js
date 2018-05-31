"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function promisify(f, thisContext) {
    return function () {
        let args = Array.prototype.slice.call(arguments);
        return new Promise((resolve, reject) => {
            args.push((err, result) => err !== null ? reject(err) : resolve(result));
            f.apply(thisContext, args);
        });
    };
}
exports.promisify = promisify;
function map(elts, f) {
    let apply = (appElts) => Promise.all(appElts.map((elt) => typeof elt.then === 'function' ? elt.then(f) : f(elt)));
    return typeof elts.then === 'function' ? elts.then(apply) : apply(elts);
}
exports.map = map;
function _try(f, thisContext) {
    let args = Array.prototype.slice.call(arguments);
    return new Promise((res, rej) => {
        try {
            args.shift();
            res(f.apply(thisContext, args));
        }
        catch (err) {
            rej(err);
        }
    });
}
exports._try = _try;
//# sourceMappingURL=index.js.map