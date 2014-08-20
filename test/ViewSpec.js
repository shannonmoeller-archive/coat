'use strict';

var View = require('../src/view'),
	Emitter = require('../src/emitter'),
	expect = require('expect.js');

describe('View', function () {
	var view = View;

	it('should wrap an object', function () {
		var el = {},
			a = view(el),
			b = new View(el),
			c = view(b),
			d = view();

		expect(a).to.be.a(View);
		expect(b).to.be.a(View);
		expect(c).to.be.a(View);
		expect(d).to.be.a(View);

		expect(a.el).to.be(el); // functional
		expect(b.el).to.be(el); // classical
		expect(c.el).to.be(el); // re-wrap
		expect(d.el).to.be(undefined); // empty

		expect(a).not.to.be(b);
		expect(b).not.to.be(c);
		expect(c).not.to.be(d);
	});

	it('should be an emitter', function () {
		expect(view()).to.be.an(Emitter);
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
