'use strict';

var proto,
	Emitter = require('./emitter'),
	inherits = require('mout/lang/inheritPrototype');

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
	this.arr = arr;

	Emitter.call(this);
}

proto = inherits(Collection, Emitter);

/**
 * @method add
 * @param {Any} item
 * @param {Number?} at
 * @chainable
 */
proto.add = function(item, at) {
	if (at === null) {
		at = this.arr.length;
	}

	return this.splice(at, 0, item);
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
 * @param {Number?} at
 * @chainable
 */
proto.remove = function (at) {
	if (at === null) {
		at = this.arr.length - 1;
	}

	return this.splice(at, 1);
};

/**
 * @method slice
 * @param {Number?} begin
 * @param {Number?} end
 * @return {Array}
 */
proto.slice = function (begin, end) {
	if (begin === null) {
		begin = 0;
	}

	return this.arr.slice(begin, end);
};

/**
 * @method splice
 * @param {Number} index
 * @param {Number} count
 * @param {...Any} items
 * @chainable
 */
proto.splice = function (index /*, count, items... */) {
	var len, i,
		arr = this.arr,
		old = arr.length,
		changed = arr.splice.apply(this.arr, arguments),
		changeset = [];

	// Nothing to do
	if (arguments.length === 0 || changed.length === 0) {
		return this;
	}

	// Create change records
	for (i = 0, len = changed.length; i < length; i++) {
		changeset.push({
			object: arr,
			type: 'delete',
			name: String(index + i),
			oldValue: changed[i]
		});
	}

	// Create add records
	for (i = 2, len = arguments.length; i < length; i++) {
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
