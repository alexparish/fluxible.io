/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import debugLib from 'debug';
import fs from 'fs';
import getSearchIndexPath from '../utils/getSearchIndexPath';
const debug = debugLib('SearchService');

export default {
    name: 'search',
    read: function (req, resource, params, config, callback) {
        debug('Reading index');
        try {
            const indexCache = JSON.parse(fs.readFileSync(getSearchIndexPath(), { encoding: 'utf-8' }));
            debug('Index loaded');
            return callback(null, indexCache);
        } catch (e) {
            callback(e);
        }
    }
};
