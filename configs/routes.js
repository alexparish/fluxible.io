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
        action: showDoc,
        pageTitle: 'Fluxible | A Pluggable Container for Isomorphic Flux Applications',
        pageDescription: 'A Pluggable Container for Isomorphic Flux Applications'
    },
    quickStart: {
        path: '/quick-start.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/quick-start.md',
        action: showDoc,
        pageTitlePrefix: 'Quick Start',
        pageDescription: 'Get started with Fluxible by using our generator to setup your application.'
    },
    faq: {
        path: '/faq.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/faq.md',
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
        action: showDoc,
        pageTitlePrefix: 'API: Actions',
        pageDescription: 'Actions (called "action creators" in Flux) in Fluxible are stateless async functions.'
    },
    components: {
        path: '/api/components.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/Components.md',
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
        action: showDoc,
        pageTitlePrefix: 'API: Plugins',
        pageDescription: 'Plugins allow you to extend the interface of each context type.'
    },
    stores: {
        path: '/api/stores.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/Stores.md',
        action: showDoc,
        pageTitlePrefix: 'API: Stores',
        pageDescription: 'Flux stores are where you keep your application\'s state and ' +
            'handle business logic that reacts to data events. '
    },

    // Addons
    baseStore: {
        path: '/api/addons/BaseStore.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/addons/BaseStore.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/BaseStore',
        pageDescription: 'A base class that you can extend to reduce boilerplate when creating stores.'
    },
    fluxibleComponent: {
        path: '/api/addons/FluxibleComponent.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/addons/FluxibleComponent.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/FluxibleComponent',
        pageDescription: 'The FluxibleComponent is a wrapper component that will provide all' +
            ' of its children with access to the Fluxible component context via React\'s' +
            ' childContextTypes and getChildContext.'
    },
    fluxibleMixin: {
        path: '/api/addons/FluxibleMixin.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/addons/FluxibleMixin.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/FluxibleMixin',
        pageDescription: 'The mixin will add the contextTypes getStore and executeAction to your component.'
    },
    connectToStores: {
        path: '/api/addons/connectToStores.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/addons/connectToStores.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/connectToStores',
        pageDescription: 'connectToStores is a higher-order component that provides a convenient way' +
            ' to access state from the stores from within your component'
    },
    createStore: {
        path: '/api/addons/createStore.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/addons/createStore.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/createStore',
        pageDescription: 'A helper method similar to React.createClass but for creating stores that' +
            ' extend BaseStore. Also supports mixins.'
    },
    provideContext: {
        path: '/api/addons/provideContext.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/api/addons/provideContext.md',
        action: showDoc,
        pageTitlePrefix: 'API: addons/provideContext',
        pageDescription: 'provideContext wraps the Component with a higher-order component' +
            ' that specifies the child context for you.'
    },

    // Tutorials
    routing: {
        path: '/tutorials/routing.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/tutorials/routing.md',
        action: showDoc,
        pageTitlePrefix: 'Routing Tutorial',
        pageDescription: 'A tutorial covering the concepts of building an isomorphic website' +
            ' with Fluxible that demonstrates routing.'
    },
    isomorphicFlux: {
        path: '/api/bringing-flux-to-the-server.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/guides/bringing-flux-to-the-server.md',
        action: showDoc,
        pageTitlePrefix: 'Bringing Flux to the Server',
        pageDescription: 'An in depth look at how Flux was brought to the server.'
    },

    // Guides
    dataServices: {
        path: '/guides/data-services.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/guides/data-services.md',
        action: showDoc,
        pageTitlePrefix: 'Data Services Guide',
        pageDescription: 'Services are where you define your CRUD operations for a' +
            ' specific resource. A resource is a unique string that identifies the data.'
    },

    // Community
    libraries: {
        path: '/community/libraries.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/community/libraries.md',
        action: showDoc,
        pageTitlePrefix: 'Community Libraries',
        pageDescription: 'Take a look at some of the libraries that our community has built.'
    },
    presentations: {
        path: '/community/presentations.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/community/presentations.md',
        action: showDoc,
        pageTitlePrefix: 'Community Presentations',
        pageDescription: 'Presentations we have given to the community.'
    },
    referenceApplications: {
        path: '/community/reference-applications.html',
        method: 'GET',
        handler: Docs,
        githubPath: '/docs/community/reference-applications.md',
        action: showDoc,
        pageTitlePrefix: 'Community Reference Applications',
        pageDescription: 'Applications using Fluxible in the wild.'
    },
    status404: {
        path: '/__http404',
        handler: Status404
    },
    status500: {
        path: '/__http500',
        handler: Status500
    }
};
