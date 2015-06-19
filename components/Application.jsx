/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global document */

import Debug from 'debug';
import React from 'react';
import Home from './Home.jsx';
import Docs from './Docs.jsx';
import { provideContext, connectToStores } from 'fluxible/addons';
import { handleHistory } from 'fluxible-router';
import NavLink from './NavLink.jsx';
import TopNav from './TopNav';
import Status404 from './Status404';
import Status500 from './Status500';
import cx from 'classnames';
import { ReactI13n, setupI13n, I13nAnchor } from 'react-i13n';
import ReactI13nGoogleAnalytics from 'react-i13n-ga';

const debug = Debug('MyApp');

class Application extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isNavigateComplete;
    }
    
    componentDidMount() {
        this.props.i13n.executeEvent('pageview', {});
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.i13n.executeEvent('pageview', {
            page: this.props.currentRoute && this.props.currentRoute.get('url'),
            title: this.props.currentTitle
        });
        document.title = this.props.currentTitle;
    }

    render() {
        debug('rendering', this.props);

        var Handler = this.props.currentRoute && this.props.currentRoute.get('handler');
        var routeName = this.props.currentRoute && this.props.currentRoute.get('name');
        var hideLogo = routeName === 'home';
        var logoClasses = cx({
            'V(h)': hideLogo,
            'Va(m) Fz(20px) Lh(1.2) C(#fff) Td(n):h': true
        });

        if (Handler) {
            if (this.props.currentNavigateError) {
                Handler = <Status500 />;
            }
            else {
                Handler = <Handler currentDoc={this.props.currentDoc} />;
            }
        }
        else {
            Handler = <Status404 />
        }

        return (
            <div className="H(100%)">
                <div className="wrapper Bxz(bb) Mih(100%)">
                    <div id="header" role="header" className="Px(10px) Py(13px) Ov(h) Z(7) Pos(r) Bgc(logo) optLegibility">
                        <div className="innerwrapper spaceBetween Mx(a)--sm W(90%)--sm W(a)--sm">
                            <NavLink className={logoClasses} routeName="home" style={{ fontFamily: 'Montserrat' }} i13nModel={{category: 'logo'}}>
                                <img src="/public/images/logo_small.svg" width="16" height="16" alt="Fluxible" style={{verticalAlign: 'baseline'}} /> Fluxible
                            </NavLink> <TopNav selected={routeName} currentRoute={this.props.currentRoute} />
                        </div>
                    </div>
                    {Handler}
                </div>
                <div id="footer" className="P(20px) Bdt(1)" role="footer">
                    <div className="innerwrapper spaceBetween Mx(a)--sm W(90%)--sm W(a)--sm">
                        <small>All code on this site is licensed under the <I13nAnchor i13nModel={{category: 'license'}} href="https://github.com/yahoo/fluxible.io/blob/master/LICENSE.md">Yahoo BSD License</I13nAnchor>, unless otherwise stated.</small> <small>&copy; 2015 Yahoo! Inc. All rights reserved.</small>
                    </div>
                </div>
            </div>
        );
    }
}

// connect to stores
Application = connectToStores(Application, ['DocStore'], function (stores, props) {
    return {
        currentTitle: stores.DocStore.getCurrentTitle() || '',
        currentDoc: stores.DocStore.getCurrent() || {}
    };
});

// wrap with history handler
Application = handleHistory(Application);

// and wrap that with context
Application = provideContext(Application);

// setup i13n
var reactI13nGoogleAnalytics = new ReactI13nGoogleAnalytics('UA-58912168-1');
Application = setupI13n(Application, {}, [reactI13nGoogleAnalytics.getPlugin()]);

export default Application;
