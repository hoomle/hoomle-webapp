'use strict';

import React from 'react/addons';
import hoomAction from '../../actions/hoomActions';
var cx = React.addons.classSet;

/**
 * TwitterHoom section
 *
 * @class TwitterHoom
 * @constructor
 */
var TwitterHoom = React.createClass({

    getInitialState() {
        return {
            id: this.props.id,
            sourceUrl: this.props.sourceUrl,
            loading: true,
            embedHtml: null,
            err: false
        };
    },

    componentDidMount() {
        var that = this;
        hoomAction.getEmbedCode(this.props.id)
            .then(function(hoom) {
                var state = that.state;
                state.embedHtml = hoom.html;
                state.loading = false;
                that.setState(state);
            }, function() {
                var state = that.state;
                state.loading = false;
                state.err = true;
                that.setState(state);
                console.log('error loading TwitterHoom(' + this.props.id + ')');
            });
    },

    render() {
        if (this.state.err) {
            return null;
        }

        if (this.state.loading) {
            return (
                /* jshint ignore:start */
                <div className="TwitterHoom loading">loading embed tweet ...</div>
                /* jshint ignore:end */
            );
        }

        return (
            /* jshint ignore:start */
            <div className="TwitterHoom" dangerouslySetInnerHTML={{__html: this.state.embedHtml}} />
            /* jshint ignore:end */
        );
    }

});

module.exports = TwitterHoom;
