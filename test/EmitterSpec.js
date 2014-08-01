'use strict';

var Emitter = require('../src/emitter'),
	expect = require('expect.js');

describe('Emitter', function () {
	var emitter = Emitter;

	it('should create an emitter', function () {
		var a = emitter(),
			b = new Emitter();

		expect(a).to.be.an(Emitter);
		expect(b).to.be.an(Emitter);

		expect(a).not.to.be(b);
	});

	describe('prototype', function () {
		describe('getListeners', function () {
			it('should get listeners', function () {
				var a = emitter();

				a.listeners = {
					foo: [function () {}]
				};

				expect(a.getListeners('foo').length).to.be(1);
				expect(a.getListeners('bar').length).to.be(0);
			});
		});

		describe('on', function () {
			it('should add a listener', function () {
				var a = emitter(),
					foo = function () {};

				a.on('foo', foo);

				expect(a.getListeners('foo')).to.eql([foo]);
			});
		});

		describe('one', function () {
			it('should add a one-time listener', function () {
				var a = emitter(),
					foo = function () {},
					bar = function () {},
					baz = function () {};

				a.on('foo', foo);
				a.one('foo', bar);
				a.on('foo', baz);

				expect(a.getListeners('foo').length).not.to.eql([foo, bar, baz]);
				expect(a.getListeners('foo').length).to.eql(3);

				a.emit('foo');

				expect(a.getListeners('foo')).to.eql([foo, baz]);
			});
		});

		describe('off', function () {
			it('should remove a listener', function () {
				var a = emitter(),
					foo = function () {},
					bar = function () {},
					baz = function () {};

				a.on('foo', foo);
				a.on('foo', bar);
				a.on('foo', baz);

				expect(a.getListeners('foo')).to.eql([foo, bar, baz]);

				a.off('foo', bar);

				expect(a.getListeners('foo')).to.eql([foo, baz]);
			});

			it('should remove a type of listener', function () {
				var a = emitter(),
					foo = function () {},
					bar = function () {},
					baz = function () {};

				a.on('foo', foo);
				a.on('bar', bar);
				a.on('foo', baz);

				expect(a.getListeners('foo')).to.eql([foo, baz]);
				expect(a.getListeners('bar')).to.eql([bar]);

				a.off('foo');

				expect(a.getListeners('foo')).to.eql([]);
				expect(a.getListeners('bar')).to.eql([bar]);
			});

			it('should remove all listeners', function () {
				var a = emitter(),
					foo = function () {},
					bar = function () {},
					baz = function () {};

				a.on('foo', foo);
				a.on('bar', bar);
				a.on('foo', baz);

				expect(a.getListeners('foo')).to.eql([foo, baz]);
				expect(a.getListeners('bar')).to.eql([bar]);

				a.off();

				expect(a.listeners).to.be(undefined);
			});
		});

		describe('emit', function () {
			it('should emit an event', function () {
				var count = 0,
					a = emitter(),
					foo = function () {
						count++;
					},
					bar = function () {
						throw new Error('bar executed unexpectedly');
					};

				a.on('foo', foo);
				a.on('bar', bar);

				a.emit('foo');

				expect(count).to.be(1);
			});

			it('should emit an event with data', function () {
				var count = 0,
					a = emitter(),
					data = { hello: 'world' },
					foo = function (obj) {
						expect(obj).to.be(data);
						count++;
					},
					bar = function () {
						throw new Error('bar executed unexpectedly');
					};

				a.on('foo', foo);
				a.on('bar', bar);

				a.emit('foo', data);

				expect(count).to.be(1);
			});
		});
	});

	describe('mixin', function () {
		it('should bless a non-emitter with emitting powers', function () {
			var a = {},
				b = Emitter.mixin(a);

			expect(a).not.to.be.an(Emitter);
			expect(a).to.have.property('on');
			expect(a).to.have.property('off');

			expect(a).to.be(b);
		});
	});
});
