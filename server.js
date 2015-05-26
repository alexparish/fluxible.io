/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import express from 'express';
import favicon from 'serve-favicon';
import serialize from 'serialize-javascript';
import { navigateAction } from 'fluxible-router';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import React from 'react';
import app from './app';
import html from './components/Html.jsx';
import tracking from './configs/tracking';
import assets from './utils/assets';
import DocsService from './services/docs';
import SearchService from './services/search';

const HtmlComponent = React.createFactory(html);
const server = express();

server.set('state namespace', 'App');
server.use(favicon(__dirname + '/assets/images/favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({ cookie: true }));

// Get access to the fetchr plugin instance
const fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our services
fetchrPlugin.registerService(DocsService);
fetchrPlugin.registerService(SearchService);

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// Render the app
function renderApp(res, context) {
    const appElement = context.createElement();
    const renderedApp = React.renderToString(appElement);
    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
    const doctype = '<!DOCTYPE html>';
    const componentContext = context.getComponentContext();
    const html = React.renderToStaticMarkup(HtmlComponent({
        assets: assets,
        context: componentContext,
        state: exposed,
        markup: renderedApp,
        tracking: tracking
    }));

    res.send(doctype + html);
}

// Every other request gets the app bootstrap
server.use(function (req, res, next) {
    const context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    context.executeAction(navigateAction, { url: req.url }, function (err) {
        renderApp(res, context);
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
