'use strict';

var proto,
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

	/**
	 * @property callbacks
	 * @type {Object.<Array.<Function>>}
	 */
	this.callbacks = {};
}

proto = Emitter.prototype;

/**
 * Return array of `event` callbacks.
 *
 * @method getListeners
 * @param {String} event
 * @return {Array}
 */
proto.getListeners = function (event) {
	return this.callbacks[event] || (this.callbacks[event] = []);
};

/**
 * Check if this emitter has any `event` callbacks.
 *
 * @method hasListeners
 * @param {String} event
 * @return {Boolean}
 */
proto.hasListeners = function (event) {
	return !!this.getListeners(event).length;
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
		fn.apply(this, arguments); //jshint ignore: line
	}

	on.fn = fn;

	this.on(event, on);

	return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @method off
 * @param {String} event
 * @param {Function} fn
 * @chainable
 */
proto.off = function (event, fn) {
	var callbacks, length, cb, i;

	switch (arguments.length) {
		case 0: {
			// all
			this.callbacks = {};

			return this;
		}

		case 1: {
			// specific type
			delete this.callbacks[event];

			return this;
		}

		default: {
			// specific method
			callbacks = this.getListeners(event);
			length = callbacks.length;

			for (i = 0; i < length; i++) {
				cb = callbacks[i];

				if (cb === fn || cb.fn === fn) {
					callbacks.splice(i, 1);
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
 * @param {Mixed} ...
 * @chainable
 */
proto.emit = function (event) {
	var args = slice.call(arguments, 1),
		callbacks = this.getListeners(event).slice(0),
		length = callbacks.length,
		i = 0;

	for (; i < length; i++) {
		callbacks[i].apply(this, args);
	}

	return this;
};

/**
 * When an event is emitted on one emitter, trigger the same event
 * on this emitter.
 *
 * @method proxy
 * @param {String} event
 * @param {Emitter} emitter
 * @chainable
 */
proto.proxy = function (event, emitter) {
	emitter.on(event, this.emit.bind(this, event));

	return this;
};

module.exports = Emitter;
