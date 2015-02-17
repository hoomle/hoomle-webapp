'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import http from 'superagent';

module.exports = {

    load(slug, cb) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.LOAD_HOMEPAGE,
            homepage: slug
        });

        // TODO Refactor with a better API module
        http.get('http://localhost:5000/api/v1/homepage/stan').accept('application/json').end(function (err, res) {
            if (err) {
                Dispatcher.handleServerAction({
                    actionType: ActionTypes.LOAD_HOMEPAGE_ERROR,
                    homepage: slug,
                    err: err
                });
                return;
            }
            Dispatcher.handleServerAction({
                actionType: ActionTypes.LOAD_HOMEPAGE_SUCCESS,
                homepage: res.body
            });
            if (cb) {
                cb();
            }
        });
    }

};
