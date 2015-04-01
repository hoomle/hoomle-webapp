'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var when = require('when');
var hoomleApi = require('../config').hoomleApi;

module.exports = {

    load: function(slug) {

        Dispatcher.handleViewAction({
            actionType: ActionTypes.LOAD_USER_HOMEPAGE_PENDING,
            slug: slug
        });

        return hoomleApi.Hooms
            .getBySlug(slug)
            .then(function(hooms) {
                console.log('LOAD_USER_HOMEPAGE_SUCCESS: ');
                console.log(hooms);
                Dispatcher.handleServerAction({
                    actionType: ActionTypes.LOAD_USER_HOMEPAGE_SUCCESS,
                    hooms: hooms
                });

                return when.resolve(hooms);
            }, function(err) {
                console.log('LOAD_USER_HOMEPAGE_ERROR: ');
                console.log(err);
                Dispatcher.handleServerAction({
                    actionType: ActionTypes.LOAD_USER_HOMEPAGE_ERROR,
                    slug: slug,
                    err: err
                });

                return when.reject({
                    slug: slug,
                    err: err
                });
            });
    }

};
