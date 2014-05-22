'use strict';

var Model = require('../src/model'),
    model = Model;

describe('Collection', function () {
    it('should wrap an object', function () {
        var obj = {},
            a = model(obj),
            b = new Model(obj),
            c = model(b);

        expect(a.obj).toBe(obj); // functional
        expect(b.obj).toBe(obj); // classical
        expect(c.obj).toBe(obj); // re-wrap
    });
});
