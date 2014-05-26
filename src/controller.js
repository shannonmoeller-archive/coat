'use strict';

var proto,
	Emitter = require('./emitter'),
	inherits = require('mout/lang/inheritPrototype');

/**
 * A simple observable controller class.
 *
 * @class Controller
 * @extends Emitter
 *
 * @constructor
 * @param {Object} options
 * @param {Container} options.app
 * @param {Model} options.model
 * @param {View} options.view
 */
function Controller(options) {
	if (!(this instanceof Controller)) {
		return new Controller(options);
	}

	options = options || {};

	/**
	 * @property app
	 * @type {Container}
	 */
	this.app = options.app;

	/**
	 * @property model
	 * @type {Model}
	 */
	this.model = options.model;

	/**
	 * @property model
	 * @type {View}
	 */
	this.view = options.view;

	Emitter.call(this);
}

proto = inherits(Controller, Emitter);

/**
 * @method start
 * @chainable
 */
proto.start = function () {
	return this;
};

module.exports = Controller;
