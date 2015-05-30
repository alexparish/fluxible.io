/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Debug from 'debug';
const debug = Debug('SearchService');

export default {
    name: 'search',
    read: function (req, resource, params, config, callback) {
        debug('Reading index');
        const index = require('../build/search.json');
        debug('Index loaded');
        return callback(null, index);
    }
};