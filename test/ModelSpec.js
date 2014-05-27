'use strict';

var Model = require('../src/model'),
	expect = require('expect.js'),
	gimmie = require('gimmie'),
	model = Model;

describe('Model', function () {
	it('should wrap an object', function () {
		var obj = {},
			a = model(obj),
			b = new Model(obj),
			c = model(b);

		expect(a instanceof Model).to.be(true);
		expect(b instanceof Model).to.be(true);

		expect(a.obj).to.be(obj); // functional
		expect(b.obj).to.be(obj); // classical
		expect(c.obj).to.be(obj); // re-wrap

		expect(a).not.to.be(b);
		expect(b).not.to.be(c);
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
			it('should set a value', function () {
				var obj = { foo: 'bar' },
					a = model(obj);

				expect(a.get('foo')).to.be('bar');
				expect(a.get('hello')).to.be(undefined);

				a.set('foo', 'baz');
				a.set('hello', 'world');

				expect(a.get('foo')).to.be('baz');
				expect(a.get('hello')).to.be('world');
			});

			it('should notify of change', function (done) {
				var count = 0,
					obj = { foo: 'bar' },
					a = model(obj);

				a.on('change', gimmie(
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

				a.set('foo', 'bar');     // shouldn't fire
				a.set('foo', 'baz');     // should fire update
				a.set('hello', 'world'); // should fire add

				process.nextTick(function () {
					expect(count).to.be(2);
					done();
				});
			});
		});
	});
});
