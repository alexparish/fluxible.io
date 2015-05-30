/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Debug from 'debug';
const debug = Debug('loadIndex');

export default function loadIndex(context, payload, done) {
    debug(payload);

    // Load from service
    context.service.read('search', {}, {}, function (err, data) {
        debug('get index from service');
        context.dispatch('RECEIVE_INDEX', data);
        done();
    });
}
