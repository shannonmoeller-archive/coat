'use strict';

var Collection = require('../src/collection'),
	collection = Collection;

describe('Collection', function () {
	it('should wrap an object', function () {
		var obj = {},
			a = collection(obj),
			b = new Collection(obj),
			c = collection(b);

		expect(a.arr).toBe(obj); // functional
		expect(b.arr).toBe(obj); // classical
		expect(c.arr).toBe(obj); // re-wrap
	});

	describe('prototype', function () {
		describe('add', function () {
			it('should', function () {
			});
		});

		describe('splice', function () {
			it('should', function () {
			});
		});
	});
});
