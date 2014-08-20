'use strict';

var Model = require('../src/model'),
	Emitter = require('../src/emitter'),
	expect = require('expect.js'),
	supply = require('mtil/function/supply');

describe('Model', function () {
	var model = Model;

	it('should wrap an object', function () {
		var obj = {},
			a = model(obj),
			b = new Model(obj),
			c = model(b),
			d = model();

		expect(a).to.be.a(Model);
		expect(b).to.be.a(Model);
		expect(c).to.be.a(Model);
		expect(d).to.be.a(Model);

		expect(a.obj).to.be(obj); // functional
		expect(b.obj).to.be(obj); // classical
		expect(c.obj).to.be(obj); // re-wrap
		expect(d.obj).to.eql({}); // create

		expect(a).not.to.be(b);
		expect(b).not.to.be(c);
		expect(c).not.to.be(d);
	});

	it('should be an emitter', function () {
		expect(model()).to.be.an(Emitter);
	});

	describe('prototype', function () {
		describe('get', function () {
			it('should return a value', function () {
				var obj = { foo: 'bar' },
					a = model(obj);

				expect(a.get()).to.be(undefined);
				expect(a.get('foo')).to.be('bar');
				expect(a.get('hello')).to.be(undefined);
			});
		});

		describe('set', function () {
			it('should set a value', function (done) {
				var count = 0,
					obj = { foo: 'bar' },
					a = model(obj);

				a.on('change', supply(
					function (changeset) {
						expect(changeset).to.eql([{
							object: obj,
							type: 'update',
							name: 'foo',
							oldValue: 'bar'
						}]);

						expect(a.get('foo')).to.be('baz');
						count++;
					},
					function (changeset) {
						expect(changeset).to.eql([{
							object: obj,
							type: 'add',
							name: 'hello',
							oldValue: undefined
						}]);

						expect(a.get('hello')).to.be('world');
						count++;
					}
				));

				expect(a.get('foo')).to.be('bar');
				expect(a.get('hello')).to.be(undefined);

				a.set('foo', 'bar');     // shouldn't fire
				a.set('foo', 'baz');     // should fire update
				a.set('hello', 'world'); // should fire add

				expect(a.get('foo')).to.be('baz');
				expect(a.get('hello')).to.be('world');

				process.nextTick(function () {
					expect(count).to.be(2);
					done();
				});
			});
		});
	});
});
