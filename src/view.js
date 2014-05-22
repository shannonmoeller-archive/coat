'use strict';

var Collection = require('./collection');

/**
 * @class View
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
}

var proto = View.prototype;

/**
 * @method append
 * @param {String|Element}
 * @chainable
 */
proto.append = function (child) {
    if (typeof child === 'string') {
        this.el.insertAdjacentHTML('beforeend', child);
    } else {
        this.el.appendChild(child);
    }

    return this;
};

/**
 * @method appendTo
 * @param {Element}
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
    return new Collection(this.el.querySelectorAll(sel));
};

module.exports = View;
