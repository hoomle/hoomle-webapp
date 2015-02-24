'use strict';

import React from 'react/addons';

/**
 * RssHoom section
 *
 * @class RssHoom
 * @constructor
 */
var RssHoom = React.createClass({

    getInitialState: function() {
        return {
            id: this.props.id,
            sourceUrl: this.props.sourceUrl,
            title: this.props.title
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
            /* jshint ignore:start */
            <div className="RssHoom">
                <a href={this.props.sourceUrl} title={this.props.title}>{this.props.title}</a>
            </div>
            /* jshint ignore:end */
        );
    }

});

module.exports = RssHoom;
