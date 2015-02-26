'use strict';

var Flux = require('flux');
var PayloadSources = require('../constants/PayloadSources');
var assign = require('react/lib/Object.assign');

/**
 * Singleton of the only one dispatcher of the app
 */
var Dispatcher = assign(new Flux.Dispatcher(), {

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the server.
     */
    handleServerAction: function(action) {
        var payload = {
            source: PayloadSources.SERVER_ACTION,
            action: action
        };
        this.dispatch(payload);
    },

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction: function(action) {
        var payload = {
            source: PayloadSources.VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    }

});

module.exports = Dispatcher;
