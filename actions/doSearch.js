/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Debug from 'debug';
const debug = Debug('doSearch');

export default function doSearch(context, query, done) {
    debug(query);
    context.dispatch('DO_SEARCH', query);
    done();
}
