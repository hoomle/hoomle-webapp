'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import http from 'superagent';

module.exports = {

    load(homepageSlug, cb) {
        console.log('hoomAction:load()');
        Dispatcher.handleViewAction({
            actionType: ActionTypes.LOAD_HOOMS,
            homepageSlug: homepageSlug
        });

        // TODO Refactor with a better API module
        http.get('http://localhost:5000/api/v1/homepage/stan/hooms').accept('application/json').end(function (err, res) {
            if (err) {
                console.log('hoomAction:load() HTTP Failed');
                Dispatcher.handleServerAction({
                    actionType: ActionTypes.LOAD_HOOMS_ERROR,
                    homepageSlug: homepageSlug,
                    err: err
                });
                return;
            }

            setTimeout(function() {

                console.log('hoomAction:load() HTTP Success');
                Dispatcher.handleServerAction({
                    actionType: ActionTypes.LOAD_HOOMS_SUCCESS,
                    homepageSlug: homepageSlug,
                    hooms: res.body.hooms
                });
                if (cb) {
                    cb();
                }

            }, 3000);


        });
    }

};
