'use strict';

var View = require('../src/view'),
	view = View;

describe('View', function () {
	var div;

	beforeEach(function () {
		div = view(document.createElement('div'));
	});

	it('should wrap an object', function () {
		var el = div.el,
			a = view(el),
			b = new View(el),
			c = view(b);

		expect(a.el).toBe(el); // functional
		expect(b.el).toBe(el); // classical
		expect(c.el).toBe(el); // re-wrap
	});

	describe('prototype', function () {
		describe('append', function () {
			it('should', function () {
			});
		});

		describe('appendTo', function () {
			it('should', function () {
			});
		});

		describe('find', function () {
			it('should find child elements', function () {
				div
					.append('<a href="http://google.com">Google</a>')
					.appendTo(document.body);

				console.log('bye');
			});
		});
	});
});
