'use strict';

var View = require('../src/view'),
	view = View;

describe('View', function () {
	it('should wrap an object', function () {
		var el = {},
			a = view(el),
			b = new View(el),
			c = view(b);

		expect(a.el).toBe(el); // functional
		expect(b.el).toBe(el); // classical
		expect(c.el).toBe(el); // re-wrap
	});

	describe('prototype', function () {
		describe('append', function () {
			it('should append a child', function () {
			});
		});

		describe('appendTo', function () {
			it('should append as a child', function () {
			});
		});

		describe('find', function () {
			it('should find child elements', function () {
			});
		});
	});
});
