/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import debugLib from 'debug';
import marked from 'marked';
import highlight from 'highlight.js';
import renderer from './../utils/renderer';
import request from 'superagent';
import secrets from './../secrets';
import qs from 'querystring';
import url from 'url';
import routes from '../configs/routes';

const debug = debugLib('APIService');

marked.setOptions({
    highlight: (code) => {
        return highlight.highlightAuto(code).value;
    }
});

// Generate an hash of valid api routes, from the /configs/apis.js file
let cache = {};

let fetchAPI = function (docParams, cb) {
    let githubRepo = docParams.repo || 'yahoo/fluxible';
    let githubPath = docParams.path;
    let githubUrl = 'https://api.github.com/repos/' + githubRepo + '/contents/';
    githubUrl += githubPath;
    githubUrl += '?' + qs.stringify({
        client_id: secrets.github.clientId,
        client_secret: secrets.github.clientSecret
    });

    request
    .get(githubUrl)
    .set('User-Agent', 'superagent')
    .end(function (err, res) {
        if (err) {
            cb && cb(err);
        }

        let md = res.body && res.body.content; // base64 encoded string of the markdown file

        if (md) {
            let mdString = new Buffer(md, 'base64').toString(); // base64 decode

            let output = marked(mdString, {renderer: renderer});

            // Replace links
            let internalLinkRegex = /href="([a-zA-Z\/\-\.]*\.md)/g;
            let replacements = [];
            let result;

            while ((result = internalLinkRegex.exec(output)) !== null) {
                // Get the relative github path to link
                let fixedRelativePath = url.resolve(githubPath, result[1]);
                let matchedDoc;

                // Find the relative github path in routes
                /*jshint ignore:start */
                Object.keys(routes).forEach((routeName) => {
                    let routeConfig = routes[routeName];
                    if (fixedRelativePath === routeConfig.githubPath) {
                        matchedDoc = routeConfig;
                        return;
                    }
                });

                /*jshint ignore:end*/
                if (!matchedDoc) {
                    console.log(githubPath + ' has a broken link to ' + fixedRelativePath);
                    continue;
                }

                replacements.push([result[1], matchedDoc.path]);
                matchedDoc = null;
            }
            replacements.forEach(function (replacement) {
                output = output.replace(replacement[0], replacement[1]);
            });

            cache[githubPath] = {
                key: githubPath,
                content: output
            };

            cb && cb(null, cache[githubPath]);
        } else {
            debug('Doc not found for', githubPath, res.body);

            cache[githubPath] = {
                key: githubPath,
                content: marked('# Doc Not Found: ' + githubPath, {renderer: renderer})
            };

            cb && cb(null, cache[githubPath]);
        }
    });
};

(function refreshCacheFromGithub() {
    Object.keys(routes).forEach(function (routeName) {
        var githubPath = routes[routeName].githubPath;
        if (githubPath) {
            fetchAPI({
                path: githubPath
            });
        }
    });

    setTimeout(refreshCacheFromGithub, 60 * 60 * 1000); // refresh cache every hour
})();

export default {
    name: 'docs',
    read: function (req, resource, params, config, callback) {
        // Return immediately if repo's readme is in cache
        if (cache[params.path]) {
            return callback(null, cache[params.path]);
        } else {
            return fetchAPI(params.path);
        }
    }
};
