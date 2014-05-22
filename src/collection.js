'use strict';

/**
 * @class Collection
 */
function Collection(list) {
    if (!(this instanceof Collection)) {
        return new Collection(list);
    }

    if (list instanceof Collection) {
        list = list.list;
    }

    /**
     * @property list
     * @type {Array|Object}
     */
    this.list = list;
}

module.exports = Collection;
