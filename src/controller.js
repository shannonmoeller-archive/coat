'use strict';

/**
 * @class Controller
 *
 * @constructor
 * @param {Object} options
 */
function Controller(options) {
    if (!(this instanceof Controller)) {
        return new Controller(options);
    }

    options = options || {};

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
}

module.exports = Controller;
