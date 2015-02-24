'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import config from '../config';

var hoomleApi = config.hoomleApi;

module.exports = {

    load(slug) {
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
