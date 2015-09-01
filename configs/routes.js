/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import showDoc from '../actions/showDoc';
import showSearch from '../actions/showSearch';
import demoException from '../actions/demoException';
import Home from '../components/Home.jsx';
import Docs from '../components/Docs.jsx';
import Status404 from '../components/Status404.jsx';
import Status500 from '../components/Status500.jsx';

export default {
    home: {
        path: '/',
        method: 'GET',
        handler: Home,
        githubPath: '/docs/home.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitle: 'Fluxible | A Pluggable Container for Isomorphic Flux Applications',
        pageDescription: 'A Pluggable Container for Isomorphic Flux Applications'
    },
    quickStart: {
        path: '/quick-start.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/quick-start.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'Quick Start',
        pageDescription: 'Get started with Fluxible by using our generator to setup your application.'
    },
    faq: {
        path: '/faq.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/faq.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'FAQ',
        pageDescription: 'Frequently asked questions from the community.'
    },
    search: {
        path: '/search.html',
        method: 'GET',
        handler: Docs,
        action: showSearch,
        pageTitlePrefix: 'Search'
    },
    demo500: {
        path: '/demo-err-500.html',
        method: 'GET',
        handler: Docs,
        action: demoException
    },

    // API
    actions: {
        path: '/api/actions.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/Actions.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'API: Actions',
        pageDescription: 'Actions (called "action creators" in Flux) in Fluxible are stateless async functions.'
    },
    components: {
        path: '/api/components.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/Components.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'API: Components',
        pageDescription: 'React components able to access the state of the application that is held within stores ' +
            'and also be able to execute actions that the stores can react to.'
    },
    fluxible: {
        path: '/api/fluxible.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/Fluxible.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'API: Fluxible',
        pageDescription: 'Instantiated once for your application, this holds settings and interfaces' +
            ' that are used across all requests.'
    },
    fluxibleContext: {
        path: '/api/fluxible-context.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/FluxibleContext.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'API: FluxibleContext',
        pageDescription: 'Instantiated once per request/session, this container provides isolation of ' +
            'stores, dispatches, and other data so that it is not shared between requests on the server side.'
    },
    plugins: {
        path: '/api/plugins.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/Plugins.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'API: Plugins',
        pageDescription: 'Plugins allow you to extend the interface of each context type.'
    },
    stores: {
        path: '/api/stores.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/Stores.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'API: Stores',
        pageDescription: 'Flux stores are where you keep your application\'s state and ' +
            'handle business logic that reacts to data events. '
    },

    // Addons
    baseStore: {
        path: '/addons/BaseStore.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/addons/BaseStore.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'API: addons/BaseStore',
        pageDescription: 'A base class that you can extend to reduce boilerplate when creating stores.'
    },
    fluxibleComponent: {
        path: '/addons/FluxibleComponent.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/FluxibleComponent.md',
        githubRepo: 'yahoo/fluxible-addons-react',
        action: showDoc,
        pageTitlePrefix: 'API: addons/FluxibleComponent',
        pageDescription: 'The FluxibleComponent is a wrapper component that will provide all' +
            ' of its children with access to the Fluxible component context via React\'s' +
            ' childContextTypes and getChildContext.'
    },
    fluxibleMixin: {
        path: '/addons/FluxibleMixin.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/FluxibleMixin.md',
        githubRepo: 'yahoo/fluxible-addons-react',
        action: showDoc,
        pageTitlePrefix: 'API: addons/FluxibleMixin',
        pageDescription: 'The mixin will add the contextTypes getStore and executeAction to your component.'
    },
    connectToStores: {
        path: '/addons/connectToStores.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/connectToStores.md',
        githubRepo: 'yahoo/fluxible-addons-react',
        action: showDoc,
        pageTitlePrefix: 'API: addons/connectToStores',
        pageDescription: 'connectToStores is a higher-order component that provides a convenient way' +
            ' to access state from the stores from within your component'
    },
    createElementWithContext: {
        path: '/addons/createElementWithContext.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/createElementWithContext.md',
        githubRepo: 'yahoo/fluxible-addons-react',
        action: showDoc,
        pageTitlePrefix: 'API: addons/createElementWithContext',
        pageDescription: 'Convenience method for instantiating the Fluxible app\'s ' +
            'top level React component (if provided in the constructor) with the given' +
            'props with an additional context key containing a ComponentContext.'
    },
    createStore: {
        path: '/addons/createStore.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/addons/createStore.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'API: addons/createStore',
        pageDescription: 'A helper method similar to React.createClass but for creating stores that' +
            ' extend BaseStore. Also supports mixins.'
    },
    provideContext: {
        path: '/addons/provideContext.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/provideContext.md',
        githubRepo: 'yahoo/fluxible-addons-react',
        action: showDoc,
        pageTitlePrefix: 'API: addons/provideContext',
        pageDescription: 'provideContext wraps the Component with a higher-order component' +
            ' that specifies the child context for you.'
    },
    batchedUpdatePlugin: {
        path: '/addons/batchedUpdatePlugin.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/batchedUpdatePlugin.md',
        githubRepo: 'yahoo/fluxible-addons-react',
        action: showDoc,
        pageTitlePrefix: 'API: addons/batchedUpdatePlugin',
        pageDescription: 'Batches React state changes for each dispatch.'
    },

    // Tutorials
    routing: {
        path: '/tutorials/routing.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/tutorials/routing.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'Routing Tutorial',
        pageDescription: 'A tutorial covering the concepts of building an isomorphic website' +
            ' with Fluxible that demonstrates routing.'
    },

    // Guides
    dataServices: {
        path: '/guides/data-services.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/guides/data-services.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'Data Services Guide',
        pageDescription: 'Services are where you define your CRUD operations for a' +
            ' specific resource. A resource is a unique string that identifies the data.'
    },
    isomorphicFlux: {
        path: '/guides/bringing-flux-to-the-server.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/guides/bringing-flux-to-the-server.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'Bringing Flux to the Server',
        pageDescription: 'An in depth look at how Flux was brought to the server.'
    },

    // Community
    libraries: {
        path: '/community/libraries.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/community/libraries.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'Community Libraries',
        pageDescription: 'Take a look at some of the libraries that our community has built.'
    },
    presentations: {
        path: '/community/presentations.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/community/presentations.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'Community Presentations',
        pageDescription: 'Presentations we have given to the community.'
    },
    referenceApplications: {
        path: '/community/reference-applications.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/community/reference-applications.md',
        githubRepo: 'yahoo/fluxible',
        action: showDoc,
        pageTitlePrefix: 'Community Reference Applications',
        pageDescription: 'Applications using Fluxible in the wild.'
    },

    // Status pages
    status404: {
        path: '/__http404',
        handler: Status404
    },
    status500: {
        path: '/__http500',
        handler: Status500
    }
};
