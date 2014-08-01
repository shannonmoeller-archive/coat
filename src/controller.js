'use strict';

var proto,
	Emitter = require('./emitter'),
	inherits = require('mtil/function/inherits');

/**
 * A simple observable controller class.
 *
 * @class Controller
 * @extends Emitter
 *
 * @constructor
 * @param {Object} scope
 */
function Controller(scope) {
	if (!(this instanceof Controller)) {
		return new Controller(scope);
	}

	/**
	 * @property scope
	 * @type {Object}
	 */
	this.scope = scope || {};

	Emitter.call(this);
}

proto = inherits(Controller, Emitter);

/**
 * @method start
 * @chainable
 */
proto.start = function(view) {
    var el = view || this.view;
    var views = el.querySelectorAll('[data-controller]:not([data-started])');

    forEach.call(views, this._start, this);

    return this;
};

/**
 * @method _start
 * @param {HTMLElement} view
 * @callback
 */
proto._start = function(view) {
    var app = this.app;
    var name = view.dataset.controller;
    var child = app.get(name, {
        app: app,
        view: view
    });

    view.setAttribute('data-started', true);

    this.getChildren(name).push(child);
};

/**
 * @method stop
 * @chainable
 */
proto.stop = function() {
    var type;
    var children = this.children;

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
proto._stop = function(child) {
    child.stop();
};

module.exports = Controller;

// 'use strict';
//
// var EventEmitter = require('../util/EventEmitter');
// var inherits = require('mtil/function/inherits');
//
// /**
//  * Native array for each method for use with array-like objects.
//  *
//  * @type {Function}
//  */
// var forEach = Array.prototype.forEach;
//
// /**
//  * @class App.Controllers.Controller
//  * @extends App.Util.EventEmitter
//  *
//  * @constructor
//  * @param {Object} options
//  */
// function Controller(options) {
//     options = options || {};
//
//     EventEmitter.call(this);
//
//     /**
//      * @property app
//      * @type {Controller}
//      */
//     this.app = options.app || this;
//
//     /**
//      * @property view
//      * @type {HTMLElement}
//      */
//     this.view = options.view || document;
//
//     /**
//      * @property children
//      * @type {Object.<String,Array.<Controller>>}
//      */
//     this.children = {};
// }
//
// var proto = inherits(Controller, EventEmitter);
//
// // -- Accessors ------------------------------------------------------------
//
// /**
//  * Return array of children `type` controllers.
//  *
//  * @method getChildren
//  * @param {String} type
//  * @return {Array}
//  */
// proto.getChildren = function(type) {
//     if (arguments.length === 0) {
//         return this.children;
//     }
//
//     return this.children[type] || (this.children[type] = []);
// };
//
// /**
//  * Check if this controller has children any `type` controllers.
//  *
//  * @method hasChildren
//  * @param {String} type
//  * @return {Boolean}
//  */
// proto.hasChildren = function(type) {
//     return !!this.getChildren(type).length;
// };
//
// // -- Methods --------------------------------------------------------------
//
// /**
//  * @method render
//  * @param {String} html
//  * @chainable
//  */
// proto.render = function(html) {
//     var view = this.view;
//
//     // Destroy
//     this.stop();
//
//     // Empty
//     while (view.firstChild) {
//         view.removeChild(view.firstChild);
//     }
//
//     // Fill
//     if (typeof html === 'string') {
//         view.insertAdjacentHTML('beforeend', html);
//     } else {
//         view.appendChild(html);
//     }
//
//     // Create
//     this.start();
//
//     return this;
// };
//
// /**
//  * @method start
//  * @chainable
//  */
// proto.start = function(view) {
//     var el = view || this.view;
//     var views = el.querySelectorAll('[data-controller]:not([data-started])');
//
//     forEach.call(views, this._start, this);
//
//     return this;
// };
//
// /**
//  * @method _start
//  * @param {HTMLElement} view
//  * @callback
//  */
// proto._start = function(view) {
//     var app = this.app;
//     var name = view.dataset.controller;
//     var child = app.get(name, {
//         app: app,
//         view: view
//     });
//
//     view.setAttribute('data-started', true);
//
//     this.getChildren(name).push(child);
// };
//
// /**
//  * @method stop
//  * @chainable
//  */
// proto.stop = function() {
//     var type;
//     var children = this.children;
//
//     for (type in children) {
//         if (children.hasOwnProperty(type)) {
//             children[type].forEach(this._stop, this);
//         }
//     }
//
//     this.children = {};
//
//     return this;
// };
//
// /**
//  * @method _stop
//  * @param {Controller} child
//  * @callback
//  */
// proto._stop = function(child) {
//     child.stop();
// };
//
// return Controller;
