'use strict';

var proto,
	Emitter = require('./emitter'),
	inherits = require('mout/lang/inheritPrototype');

/**
 * A simple array mutator.
 *
 * @class Collection
 * @extends Emitter
 *
 * @constructor
 * @param {Array} arr
 */
function Collection(arr) {
	if (!(this instanceof Collection)) {
		return new Collection(arr);
	}

	if (arr instanceof Collection) {
		arr = arr.arr;
	}

	/**
	 * @property arr
	 * @type {Array|Object}
	 */
	this.arr = arr;

	Emitter.call(this);
}

proto = inherits(Collection, Emitter);

/**
 * @method add
 * @chainable
 */
proto.add = function () {
	return this;
};

/**
 * @method splice
 * @chainable
 */
proto.splice = function () {
	return this;
};

module.exports = Collection;
