/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global document, window */

import React from 'react';
import app from './app';
import Debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';

const dehydratedState = window.App; // sent from the server

// for chrome dev tool support
window.React = React;
window.app = app;
window.fluxibleDebug = Debug;

app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }

    window.context = context;

    React.render(createElementWithContext(context),
        document.getElementById('docsapp')
    );
});
