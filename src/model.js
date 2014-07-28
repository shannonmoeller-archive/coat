'use strict';

var proto,
	Emitter = require('./emitter'),
	inherits = require('mtil/function/inherits');

/**
 * A simple observable object mutator.
 *
 * @class Model
 * @extends Emitter
 *
 * @constructor
 * @param {Object} obj
 */
function Model(obj) {
	if (!(this instanceof Model)) {
		return new Model(obj);
	}

	if (obj instanceof Model) {
		obj = obj.obj;
	}

	/**
	 * @property obj
	 * @type {Object}
	 */
	this.obj = obj || {};

	Emitter.call(this);
}

proto = inherits(Model, Emitter);

/**
 * @method get
 * @param {*} name
 * @return {*}
 */
proto.get = function (name) {
	return this.obj[name];
};

/**
 * @method set
 * @param {*} name
 * @param {*} value
 * @chainable
 */
proto.set = function (name, value) {
	var type,
		obj = this.obj,
		old = obj[name];

	// Nothing to do
	if (value === old) {
		return this;
	}

	// Determine change type
	type = name in obj ? 'update' : 'add';

	// Update value
	obj[name] = value;

	// Notify
	this.emit('change', [{
		object: obj,
		type: type,
		name: name,
		oldValue: old
	}]);

	return this;
};

module.exports = Model;
