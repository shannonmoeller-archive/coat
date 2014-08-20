'use strict';

var Controller = require('../src/controller'),
	Emitter = require('../src/emitter'),
	expect = require('expect.js');

describe('Controller', function () {
	var controller = Controller;

	it('should create an instance', function () {
		var a = controller(),
			b = new Controller();

		expect(a).to.be.a(Controller);
		expect(b).to.be.a(Controller);

		expect(a).not.to.be(b);
	});

	it('should be an emitter', function () {
		expect(controller()).to.be.an(Emitter);
	});

	describe('prototype', function () {
		describe('getChildren', function () {
			it('should get children', function () {
				var a = controller();

				a.children = {
					foo: [function () {}]
				};

				expect(a.getChildren('foo').length).to.be(1);
				expect(a.getChildren('bar').length).to.be(0);
			});
		});

		describe('start', function () {
			it('should', function () {
			});
		});

		describe('_start', function () {
			it('should', function () {
			});
		});

		describe('stop', function () {
			it('should', function () {
			});
		});

		describe('_stop', function () {
			it('should', function () {
			});
		});
	});
});
