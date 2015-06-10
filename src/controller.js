'use strict';

var proto,
	Emitter = require('./emitter'),
	inherits = require('mtil/function/inherits'),

	/**
	 * Selects non-started child controlers.
	 *
	 * @type {String}
	 */
	CHILD_SELECTOR = '[data-controller]:not([data-started])';

/**
 * A simple observable controller class.
 *
 * @class Controller
 * @extends Emitter
 *
 * @constructor
 * @param {Object} scope
 * @param {Container} app
 */
function Controller(scope, app) {
	if (!(this instanceof Controller)) {
		return new Controller(scope);
	}

	/**
	 * @property app
	 * @type {Container}
	 */
	this.app = app;

	/**
	 * @property children
	 * @type {Object}
	 */
	this.children = {};

	/**
	 * @property scope
	 * @type {Object}
	 */
	this.scope = scope || {};

	Emitter.call(this);
}

proto = inherits(Controller, Emitter);

/**
 * Returns or creates an array of `type` children.
 *
 * @method getChildren
 * @param {String} type
 * @return {Array}
 */
proto.getChildrenByType = function (type) {
	var children = this.children;

	return children[type] || (children[type] = []);
};

/**
 * @method start
 * @chainable
 */
proto.start = function (view) {
	var el = view || this.scope.view,
		views = el.querySelectorAll(CHILD_SELECTOR);

	Array.from(views).forEach(this._start, this);

	return this;
};

/**
 * @method _start
 * @param {HTMLElement} view
 * @callback
 */
proto._start = function (view) {
	var child,
		app = this.app,
		scope = Object.create(this.scope),
		type = view.dataset.controller;

	// Expose view
	scope.view = view;

	// Create child
	child = app.get(type, scope);

	// Flag as started
	view.setAttribute('data-started', true);

	// Add child
	this.getChildrenByType(type).push(child);
};

/**
 * @method stop
 * @chainable
 */
proto.stop = function () {
	var type,
		children = this.children;

	for (type in children) {
		if (children.hasOwnProperty(type)) {
			children[type].forEach(this._stop, this);
		}
	}

	this.children = {};

	return this;
};

/**
 * @method _stop
 * @param {Controller} child
 * @callback
 */
proto._stop = function (child) {
	child.stop();
};

module.exports = Controller;
