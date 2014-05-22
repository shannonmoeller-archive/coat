'use strict';

var Collection = require('../src/collection'),
    collection = Collection;

describe('Collection', function () {
    it('should wrap an object', function () {
        var obj = {},
            a = collection(obj),
            b = new Collection(obj),
            c = collection(b);

        expect(a.list).toBe(obj); // functional
        expect(b.list).toBe(obj); // classical
        expect(c.list).toBe(obj); // re-wrap
    });
});
