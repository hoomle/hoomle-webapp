'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var hoomleApi = require('../config').hoomleApi;

module.exports = {

    load: function(slug) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.LOAD_HOMEPAGE,
            homepage: slug
        });

        return hoomleApi.Homepages.getBySlug(slug)
            .then(function(homepage) {
                Dispatcher.handleServerAction({
                    actionType: ActionTypes.LOAD_HOMEPAGE_SUCCESS,
                    homepage: homepage
                });
            }, function(err) {
                Dispatcher.handleServerAction({
                    actionType: ActionTypes.LOAD_HOMEPAGE_ERROR,
                    homepage: slug,
                    err: err
                });
            });
    }

};
