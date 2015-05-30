/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import React from 'react';
import cx from 'classnames';
import { navigateAction, RouteStore } from 'fluxible-router';
import connectToStores from 'fluxible/addons/connectToStores';
import loadIndex from '../actions/loadIndex';
import SearchStore from '../stores/SearchStore';
import Debug from 'debug';
const debug = Debug('Search');
const ENTER_KEY_CODE = 13;

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        this.context.executeAction(loadIndex);

        // if on search page with query, then set state
        const query = this.props.currentRoute.get('query').get('q');
        if (query) {
            this.setState({
                visible: true
            });
        }
    }

    componentDidUpdate() {
        const el = React.findDOMNode(this.refs.q);

        // ensure input is focused
        if (this.state.visible) {
            el.focus();
        }

        // set input to query if present
        const query = this.context.getStore(SearchStore).getQuery();
        if (query) {
            el.value = query;
        }
    }

    _toggleSearchVisibility() {
        this.setState({
            visible: !this.state.visible
        });
    }

    _getPath() {
        return this.context.getStore(RouteStore).makePath('search');
    }

    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            event.stopPropagation();

            this.context.executeAction(navigateAction, {
                method: 'GET',
                url: this._getPath() + '?q=' + event.target.value
            });
        }
    }

    render() {
        let classes = cx({
            'D-ib Mstart-3px Ov-h Va-m Pos-a End-20px': true,
            'W-0': this.state.visible === false,
            'W-200px Ov-a': this.state.visible
        });
        return (
            <div className="D-ib">
                <form className={classes}>
                    <input
                        ref="q"
                        type="text"
                        name="q"
                        onKeyDown={this._onKeyDown.bind(this)}
                        className="Px-4px Py-1px Bdrs-2px Bd-2 C-#fff Fw-b"
                    />
                </form>
                <i className="Va-m Pos-r fa fa-search Cur-p" onClick={this._toggleSearchVisibility.bind(this)}></i>
            </div>
        );
    }
}

Search.contextTypes = {
    executeAction: React.PropTypes.func,
    getStore: React.PropTypes.func
};

Search.propTypes = {
    currentRoute: React.PropTypes.object
};

Search = connectToStores(Search, [ SearchStore ], function (stores, props) {
    return {
        search: stores.SearchStore.getState()
    };
});

export default Search;
