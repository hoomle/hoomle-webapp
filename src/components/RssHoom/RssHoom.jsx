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

    render() {
        return (
            /* jshint ignore:start */
            <div className="Hoom RssHoom">
                <a href={this.props.sourceUrl} title={this.props.title}>{this.props.title}</a>
            </div>
            /* jshint ignore:end */
        );
    }

});

module.exports = RssHoom;
