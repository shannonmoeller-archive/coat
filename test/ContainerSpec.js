'use strict';

var Container = require('../src/container'),
	expect = require('expect.js');

describe('Container', function () {
	var container = Container;

	it('should', function () {
		var a = container(),
			b = new Container();

		expect(a).to.be.a(Container);
		expect(a).to.have.property('on');
		expect(a).to.have.property('off');

		expect(b).to.be.a(Container);
		expect(b).to.have.property('on');
		expect(b).to.have.property('off');

		expect(a).not.to.be(b);
	});

	describe('prototype', function () {
		describe('get', function () {
			it('should return a module', function () {
				var a = container(),
					foo = ['a', 'b', 'c'],
					bar = { name: 'Bar' };

				a.set('Foo', foo);
				a.set(bar);

				// return Foo;
				expect(a.get('Foo')).to.be(foo);
				expect(a.get('Bar')).to.be(bar);
			});

			it('should return a module instance', function () {
				var a = container(),
					Foo = function () {};

				a.set('Foo', Foo);

				// return new Foo();
				expect(a.get('Foo')).to.be.a(Foo);
			});

			it('should return a module instance from a factory', function () {
				var a = container(),
					foo = ['a', 'b', 'c'],
					bar = {
						name: 'Bar',
						factory: function () {
							return foo;
						}
					};

				a.set(bar);

				// return Bar.factory();
				expect(a.get('Bar')).to.be(foo);
			});
		});
	});
});
