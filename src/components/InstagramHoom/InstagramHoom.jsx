'use strict';

import React from 'react/addons';

var cx = React.addons.classSet;

/**
 * InstagramHoom section
 *
 * @class InstagramHoom
 * @constructor
 */
var InstagramHoom = React.createClass({

    getInitialState: function() {
        return {
            id: this.props.id,
            sourceUrl: this.props.sourceUrl
        };
    },

    componentDidMount: function() {
        // HoomStore.onChange(this._onStoreChange);
        // hoomAction.load(this.props.homepage);
    },

    componentWillUnmount: function() {
        // HoomStore.off(this._onStoreChange);
    },

    _onStoreChange: function() {
        // this.setState(HoomStore.getStateForHomepage(this.props.homepage));
    },

    render() {
        return (
            <div className="InstagramHoom">Instagram hoom {this.props.id}</div>
        );
    }

});

module.exports = InstagramHoom;
