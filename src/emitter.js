'use strict';

var proto,
	mixin = require('mtil/object/mixin'),
	slice = Array.prototype.slice;

/**
 * A simple event emitter.
 *
 * @class Emitter
 *
 * @constructor
 */
function Emitter() {
	if (!(this instanceof Emitter)) {
		return new Emitter();
	}
}

proto = Emitter.prototype;

/**
 * Returns or creates an array of `event` listeners.
 *
 * @method getListeners
 * @param {String} event
 * @return {Array}
 */
proto.getListeners = function (event) {
	var listeners = this.listeners || (this.listeners = {});

	return listeners[event] || (listeners[event] = []);
};

/**
 * Listen on the given `event` with `fn`.
 *
 * @method on
 * @param {String} event
 * @param {Function} fn
 * @chainable
 */
proto.on = function (event, fn) {
	this.getListeners(event).push(fn);

	return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @method one
 * @param {String} event
 * @param {Function} fn
 * @chainable
 */
proto.one = function (event, fn) {
	var that = this;

	function on() {
		that.off(event, on);
		fn.apply(this, arguments); // jshint ignore: line
	}

	on.fn = fn;

	this.on(event, on);

	return this;
};

/**
 * Remove a specific callback, all listeners for a given `event`,
 * or all listeners entirely.
 *
 * @method off
 * @param {String} event
 * @param {Function} fn
 * @chainable
 */
proto.off = function (event, fn) {
	var listeners, length, cb, i;

	switch (arguments.length) {
		case 0: {
			// all
			delete this.listeners;

			return this;
		}

		case 1: {
			// specific type
			delete this.listeners[event];

			return this;
		}

		default: {
			// specific method
			listeners = this.getListeners(event);
			length = listeners.length;

			for (i = 0; i < length; i++) {
				cb = listeners[i];

				if (cb === fn || cb.fn === fn) {
					listeners.splice(i, 1);
					break;
				}
			}

			return this;
		}
	}
};

/**
 * Emit `event` with the given args.
 *
 * @method emit
 * @param {String} event
 * @param {Mixed} ...args
 * @chainable
 */
proto.emit = function (event) {
	var args = slice.call(arguments, 1),
		listeners = this.getListeners(event).slice(0),
		length = listeners.length,
		i = 0;

	for (; i < length; i++) {
		listeners[i].apply(this, args);
	}

	return this;
};

/**
 * Blesses an object with emitting powers.
 *
 * @method mixin
 * @param {Object} obj
 * @return {Object}
 * @static
 */

Emitter.mixin = function (obj) {
	return mixin(obj, proto);
};

module.exports = Emitter;
