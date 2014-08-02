'use strict';

var proto,
	Emitter = require('./emitter'),
	inherits = require('mtil/function/inherits');

/**
 * A simple observable array mutator.
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
	 * @type {Array}
	 */
	this.arr = arr || [];

	Emitter.call(this);
}

proto = inherits(Collection, Emitter);

/**
 * @method add
 * @param {*} item
 * @chainable
 */
proto.add = function (item) {
	return this.splice(this.arr.length, 0, item);
};

/**
 * @method empty
 * @chainable
 */
proto.empty = function () {
	return this.splice(0, this.arr.length);
};

/**
 * @method remove
 * @param {*} item
 * @chainable
 */
proto.remove = function (item) {
	var index = this.arr.indexOf(item);

	if (index < 0) {
		return this;
	}

	return this.splice(index, 1);
};

/**
 * @method slice
 * @param {Number=} begin
 * @param {Number=} end
 * @return {Array}
 */
proto.slice = function (begin, end) {
	if (begin == null) {
		begin = 0;
	}

	return this.arr.slice(begin, end);
};

/**
 * @method splice
 * @param {Number} index
 * @param {Number=} count
 * @param {...*} items
 * @chainable
 */
proto.splice = function (index) {
	if (index == null) {
		return this;
	}

	var len, i,
		arr = this.arr,
		old = arr.length,
		changed = arr.splice.apply(this.arr, arguments),
		changeset = [];

	// Create delete records
	for (i = 0, len = changed.length; i < len; i++) {
		changeset.push({
			object: arr,
			type: 'delete',
			name: String(index + i),
			oldValue: changed[i]
		});
	}

	// Create add records
	for (i = 2, len = arguments.length; i < len; i++) {
		changeset.push({
			object: arr,
			type: 'add',
			name: String(index + i - 2)
		});
	}

	// Create update record
	if (arr.length !== old) {
		changeset.push({
			object: arr,
			type: 'update',
			name: 'length',
			oldValue: old
		});
	}

	// Notify
	if (changeset.length) {
		this.emit('change', changeset);
	}

	return this;
};

module.exports = Collection;
