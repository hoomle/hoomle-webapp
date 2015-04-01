'use strict';

var React           = require('react');
var SessionStore    = require('../stores/SessionStore');
var _               = require('lodash');

/**
 * Homepage section
 *
 * @class Homepage
 * @constructor
 */
var Homepage = React.createClass({

    getInitialState: function() {
        return SessionStore.getState();
    },

    componentDidMount: function() {
        SessionStore.onChange(this._onStoreChange);
    },

    componentWillUnmount: function() {
        SessionStore.off(this._onStoreChange);
    },

    _onStoreChange: function() {
        this.setState(SessionStore.getState());
    },

    render: function() {
        var userInfo = null;
        if (this.state.isLogged) {
            userInfo = <div>{this.state.hooms.user.displayName}</div>;
        }

        return (
            /* jshint ignore:start */
            <div>{userInfo} Homepage</div>
            /* jshint ignore:end */
        );
    }

});

module.exports = Homepage;
