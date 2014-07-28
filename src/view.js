'use strict';

var proto,
	Emitter = require('./emitter'),
	inherits = require('mtil/function/inherits');

/**
 * A simple observable element mutator.
 *
 * @class View
 * @extends Emitter
 *
 * @constructor
 * @param {Element} el
 */
function View(el) {
	if (!(this instanceof View)) {
		return new View(el);
	}

	if (el instanceof View) {
		el = el.el;
	}

	/**
	 * @property el
	 * @type {Element}
	 */
	this.el = el;

	Emitter.call(this);
}

proto = inherits(View, Emitter);

/**
 * @method append
 * @param {String|Element} child
 * @chainable
 */
proto.append = function (child) {
	if (typeof child === 'string') {
		this.el.insertAdjacentHTML('beforeend', child);
	}
	else {
		this.el.appendChild(child);
	}

	return this;
};

/**
 * @method appendTo
 * @param {Element} parent
 * @chainable
 */
proto.appendTo = function (parent) {
	new View(parent).append(this.el);

	return this;
};

/**
 * @method find
 * @param {String} sel
 * @return {Collection}
 */
proto.find = function (sel) {
	return this.el.querySelectorAll(sel);
};

module.exports = View;
