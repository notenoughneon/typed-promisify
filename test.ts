import * as assert from 'assert';
import {map} from './index';


describe('map', function() {
    var elts = [1, 2, 3];
    var f: (n) => Promise<number> = n => new Promise((res,rej) => res(n * n));
    var expected = [1, 4, 9];

    it('array of values', function(done) {
        map(elts, f)
        .then(res => assert.deepEqual(res, expected))
        .then(done);
    });

    it('array of promises', function(done) {
        var eltps = elts.map(elt => new Promise((res, rej) => res(elt)));
        map(eltps, f)
        .then(res => assert.deepEqual(res, expected))
        .then(done);
    });

    it('promise of array of values', function(done) {
        var pelts = new Promise((res,rej) => res(elts));
        map(pelts, f)
        .then(res => assert.deepEqual(res, expected))
        .then(done);
    });

    it('promise of array of promises', function(done) {
        var peltps = new Promise((res,rej) => res(elts.map(elt => new Promise((res, rej) => res(elt)))));
        map(peltps, f)
        .then(res => assert.deepEqual(res, expected))
        .then(done);
    });
});
