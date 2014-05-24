'use strict';

var proto,
	Emitter = require('./emitter'),
	inherits = require('mout/lang/inheritPrototype');

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

	/**
	 * @property registry
	 * @type {Object.<String,Any>}
	 */
	this.registry = {};

	Emitter.call(this);
}

proto = inherits(Container, Emitter);

/**
 * Returns a module by name. If the module is a function, it's assumed to be
 * a constructor and is instantiated with the given options.
 *
 * @method get
 * @param {String} name
 * @param {Object} options
 * @return {Any}
 */
proto.get = function (name, options) {
	var Module = this.registry[name];

	if (Module && typeof Module.factory === 'function') {
		return Module.factory(options);
	}

	if (typeof Module !== 'function') {
		return Module;
	}

	options = options || {};
	options.app = options.app || this;

	return new Module(options);
};

/**
 * Registers a module by name.
 *
 * @method set
 * @param {String} name
 * @param {Any} module
 * @return {Any}
 */
proto.set = function (name, module) {
	if (arguments.length === 1) {
		module = name;
		name = module.name;
	}

	this.registry[name] = module;

	return this;
};

module.exports = Container;
