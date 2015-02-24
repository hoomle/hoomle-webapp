'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import config from '../config';

var hoomleApi = config.hoomleApi;

module.exports = {

    load(homepageSlug) {
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

    getOembedByHoom(hoomId) {
        return hoomleApi.Hooms.getOembedByHoom(hoomId);
    }

};
