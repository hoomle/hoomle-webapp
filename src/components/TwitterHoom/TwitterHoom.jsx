'use strict';

import React from 'react/addons';

var cx = React.addons.classSet;

/**
 * TwitterHoom section
 *
 * @class TwitterHoom
 * @constructor
 */
var TwitterHoom = React.createClass({

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
            <div className="TwitterHoom">Twitter hoom {this.props.id}</div>
        );
    }

});

module.exports = TwitterHoom;
