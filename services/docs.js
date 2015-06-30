/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import async from 'async';
import debugLib from 'debug';
import fs from 'fs';
import getSearchIndexPath from '../utils/getSearchIndexPath';
import highlight from 'highlight.js';
import lunr from 'lunr';
import marked from 'marked';
import qs from 'querystring';
import renderer from './../utils/renderer';
import request from 'superagent';
import routes from '../configs/routes';
import secrets from './../secrets';
import url from 'url';

const debug = debugLib('DocsService');
const indexDb = getSearchIndexPath();

marked.setOptions({
    highlight: (code) => {
        return highlight.highlightAuto(code).value;
    }
});

// Generate an hash of valid api routes, from the /configs/apis.js file
let cache = {};
let documents = [];

// setup lunr index
const index = lunr(function () {
    debug('Creating lunr index');
    this.field('title', { boost: 10 });
    this.field('description', { boost: 5 });
    this.field('body');
    this.field('permalink');
});

const fetchAPI = function (docParams, cb) {
    const title = docParams.pageTitlePrefix || docParams.pageTitle;
    const description = docParams.pageDescription;
    const githubRepo = docParams.githubRepo || 'yahoo/fluxible';
    const githubPath = docParams.githubPath;

    // create github api url
    let githubUrl = 'https://api.github.com/repos/' + githubRepo + '/contents/';
    githubUrl += githubPath + '?';

    // use access token if available, otherwise use client id and secret
    if (secrets.github.accessToken) {
        githubUrl += qs.stringify({
            access_token: secrets.github.accessToken
        });
    } else {
        githubUrl += qs.stringify({
            client_id: secrets.github.clientId,
            client_secret: secrets.github.clientSecret
        });
    }

    // add tag from npm version
    if (docParams.githubTag) {
        githubUrl += '&ref=' + docParams.githubTag;
    }
    debug(githubUrl);

    request
    .get(githubUrl)
    .set('User-Agent', 'superagent')
    .end(function (err, res) {
        if (err) {
            return cb(err);
        }

        let md = res.body && res.body.content; // base64 encoded string of the markdown file

        if (md) {
            let mdString = new Buffer(md, 'base64').toString(); // base64 decode

            let output = marked(mdString, {renderer: renderer});

            // Replace all .md links
            let linkRegex = /href="([^\"]+\.md)"/g;
            let replacements = [];
            let result;

            while ((result = linkRegex.exec(output)) !== null) {
                // Get the relative github path to link
                let fixedRelativePath = url.resolve(githubPath, result[1]);
                let matchedDoc;

                // Find the relative github path in routes
                /*jshint ignore:start */
                Object.keys(routes).forEach((routeName) => {
                    let routeConfig = routes[routeName];

                    if (
                        (fixedRelativePath === routeConfig.githubPath) ||
                        // support absolute urls of links from different repositories
                        (result[1].indexOf('http') !== -1 && result[1].indexOf(routeConfig.githubPath) !== -1)
                    ) {
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

            // index document for searching
            debug('Adding %s to index', githubPath);
            const document = {
                id: githubPath,
                title: title,
                body: output,
                description: description,
                permalink: docParams.path
            };
            index.add(document);
            documents.push(document);

            return cb(null, cache[githubPath]);
        } else {
            console.error('Doc not found for', githubPath, res.body);

            cache[githubPath] = {
                key: githubPath,
                content: marked('# Doc Not Found: ' + githubPath, {renderer: renderer})
            };

            return cb(null, cache[githubPath]);
        }
    });
};

const fetchNpm = function (pkg, cb) {
    var url = 'http://registry.npmjs.org/' + pkg;
    debug(url);

    request
    .get(url)
    .end(function (err, res) {
        let version;

        if (err || !res) {
            return cb(new Error('npm request failed: ' + url));
        }

        if (res.body && res.body['dist-tags']) {
            version = res.body['dist-tags'].latest;
        }

        cb(null, version);
    });
};

/*
 Steps
 1. Call npm API to return version for fluxible and fluxible-addons-react
 2. Uses these versions to make GitHub API calls for docs content
 */
(function refreshCacheFromGithub() {
    var versionHash = {
        'yahoo/fluxible': null,
        'fluxible-addons-react': null
    };
    async.auto({
        fluxibleVersion: function (cb) {
            fetchNpm('fluxible', cb);
        },
        fluxibleAddonsVersion: function (cb) {
            fetchNpm('fluxible-addons-react', cb);
        },
        fetchAPI: ['fluxibleVersion', 'fluxibleAddonsVersion', function (cb, results) {
            debug('fetchAPI version results', results);

            const fetches = [];
            versionHash['yahoo/fluxible'] = results.fluxibleVersion;
            versionHash['yahoo/fluxible-addons-react'] = results.fluxibleAddonsVersion;

            Object.keys(routes).forEach(function eachRoute(routeName) {
                let routeConfig = routes[routeName];

                // pass npm version depending on repo source to only pull
                // content for that tag
                routeConfig.githubTag = 'v' + versionHash[routeConfig.githubRepo];

                if (routeConfig.githubPath) {
                    fetches.push(function eachTask(cb) {
                        fetchAPI(routeConfig, cb);
                    });
                }
            });

            async.parallel(fetches, function npmFetchesCallback(err) {
                if (err) {
                    return console.error(err);
                }

                // save index
                const data = {
                    docs: documents,
                    index: index.toJSON()
                };

                fs.writeFileSync(indexDb, JSON.stringify(data));
            });
        }]
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
