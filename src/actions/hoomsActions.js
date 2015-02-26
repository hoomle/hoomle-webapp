'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var hoomleApi = require('../config').hoomleApi;

module.exports = {

    load: function(homepageSlug) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.LOAD_HOOMS,
            homepageSlug: homepageSlug
        });

        hoomleApi.Hooms.getByHomepageSlug(homepageSlug).then(function(hooms) {
            Dispatcher.handleServerAction({
                actionType: ActionTypes.LOAD_HOOMS_SUCCESS,
                homepageSlug: homepageSlug,
                hooms: hooms
            });
        }, function(err) {
            Dispatcher.handleServerAction({
                actionType: ActionTypes.LOAD_HOOMS_ERROR,
                homepageSlug: homepageSlug,
                err: err
            });
        });
    },

    getOembedByHoom: function(hoomId) {
        return hoomleApi.Hooms.getOembedByHoom(hoomId);
    }

};
