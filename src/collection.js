'use strict';

/**
 * @class Collection
 */
function Collection(arr) {
    if (!(this instanceof Collection)) {
        return new Collection(arr);
    }

    if (arr instanceof Collection) {
        arr = arr.arr;
    }

    /**
     * @property arr
     * @type {Array|Object}
     */
    this.arr = arr;
}

module.exports = Collection;
