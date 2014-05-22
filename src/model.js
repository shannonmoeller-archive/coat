'use strict';

var proto,
    Emitter = require('./emitter'),
    inherits = require('mout/lang/inheritPrototype');

/**
 * @class Model
 *
 * @constructor
 * @param {Object} obj
 */
function Model(obj) {
    if (!(this instanceof Model)) {
        return new Model(obj);
    }

    if (obj instanceof Model) {
        obj = obj.obj;
    }

    /**
     * @property obj
     * @type {Object}
     */
    this.obj = obj;
}

proto = inherits(Model, Emitter);

/**
 * @method get
 * @param {Any} name
 * @return {Any}
 */
proto.get = function (name) {
    return this.obj[name];
};

/**
 * @method set
 * @param {Any} name
 * @param {Any} value
 * @chainable
 */
proto.set = function (name, value) {
    var obj = this.obj;
    var old = obj[name];

    obj[name] = value;

    this.emit('change', [{
        type: 'updated',
        object: obj,
        name: name,
        oldValue: old
    }]);

    return this;
};

module.exports = Model;
