/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Debug from 'debug';
const debug = Debug('showSearch');

export default function (context, route, done) {
    debug('show search page');
    context.dispatch('DO_SEARCH', route.get('query').get('q'));
    done();
}
