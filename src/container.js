'use strict';

var proto,
	Emitter = require('./emitter'),
	inherits = require('mtil/function/inherits');

/**
 * A simple inversion-of-control container.
 *
 * @class Container
 * @extends Emitter
 *
 * @constructor
 */
function Container() {
	if (!(this instanceof Container)) {
		return new Container();
	}

	Emitter.call(this);
}

proto = inherits(Container, Emitter);

/**
 * Returns an instance of a module, by any means neccessary.
 *
 * @method get
 * @param {String} name
 * @param {Object} options
 * @return {*}
 */
proto.get = function (name, options) {
	var modules = this._modules,
		Module = modules && modules[name];

	if (Module == null) {
		throw new Error('Module not found: ' + name);
	}

	if (Module && typeof Module.factory === 'function') {
		return Module.factory(options, this);
	}

	if (typeof Module === 'function') {
		return new Module(options, this);
	}

	return Module;
};

/**
 * Registers a module.
 *
 * @method set
 * @param {String} name
 * @param {*} module
 * @return {*}
 */
proto.set = function (name, module) {
	var modules = this._modules || (this._modules = {});

	if (arguments.length === 1) {
		module = name;
		name = module.name;
	}

	modules[name] = module;

	return this;
};

module.exports = Container;
