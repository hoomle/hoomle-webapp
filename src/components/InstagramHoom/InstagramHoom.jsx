'use strict';

import React from 'react/addons';
import hoomsActions from '../../actions/hoomsActions';

/**
 * InstagramHoom section
 *
 * @class InstagramHoom
 * @constructor
 */
var InstagramHoom = React.createClass({

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
        hoomsActions.getOembedByHoom(this.props.id)
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
                console.log('error loading InstagramHoom(' + this.props.id + ')');
            });
    },

    componentDidUpdate() {
        if (this.state.loading === false && this.state.err === false) {
            instgrm.Embeds.process();
        }
    },

    render() {
        if (this.state.err) {
            return null;
        }

        if (this.state.loading) {
            return (
                /* jshint ignore:start */
                <div className="Hoom InstagramHoom loading">loading embed instagram ...</div>
                /* jshint ignore:end */
            );
        }

        return (
            /* jshint ignore:start */
            <div className="Hoom InstagramHoom" dangerouslySetInnerHTML={{__html: this.state.embedHtml}} />
            /* jshint ignore:end */
        );
    }
});

module.exports = InstagramHoom;
