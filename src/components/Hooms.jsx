'use strict';

var React = require('react/addons');
var HoomStore = require('../stores/HoomStore');
var hoomsActions = require('../actions/hoomsActions');
var TwitterHoom = require('./TwitterHoom');
var InstagramHoom = require('./InstagramHoom');

/**
 * Hooms section
 *
 * @class Hooms
 * @constructor
 */
var Hooms = React.createClass({

    getInitialState: function() {
        return HoomStore.getStateForHomepage(this.props.homepage);
    },

    componentDidMount: function() {
        HoomStore.onChange(this._onStoreChange);
        hoomsActions.load(this.props.homepage);
    },

    componentWillUnmount: function() {
        HoomStore.off(this._onStoreChange);
    },

    _onStoreChange: function() {
        this.setState(HoomStore.getStateForHomepage(this.props.homepage));
    },

    render: function() {
        if (this.state.loading) {
            return (
                /* jshint ignore:start */
                <div className="Hooms loading">loading ...</div>
                /* jshint ignore:end */
            );
        }

        var v = this.state.hooms.map(this.renderHoom);

        return (
            /* jshint ignore:start */
            <div className="Hooms">{v}</div>
            /* jshint ignore:end */
        );
    },

    renderHoom: function(hoom) {
        if (hoom.source == 'twitter') {
            return (
                /* jshint ignore:start */
                <TwitterHoom key={hoom.id} id={hoom.id} source-url={hoom.sourceUrl} />
                /* jshint ignore:end */
            );
        } else if (hoom.source == 'instagram') {
            return (
                /* jshint ignore:start */
                <InstagramHoom key={hoom.id} id={hoom.id} source-url={hoom.sourceUrl} />
                /* jshint ignore:end */
            );
        }

        return null;
    }

});

module.exports = Hooms;
