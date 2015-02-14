'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import http from 'superagent';

module.exports = {

    loadProfile(username, cb) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.LOAD_PROFILE,
            username: username
        });

        // TODO Refactor with a better API module
        http.get('http://localhost:5000/api/v1/users/stan').accept('application/json').end(function (err, res) {
            if (err) {
                Dispatcher.handleServerAction({
                    actionType: ActionTypes.LOAD_PROFILE_ERROR,
                    username: username,
                    err: err
                });
                return;
            }
            Dispatcher.handleServerAction({
                actionType: ActionTypes.LOAD_PROFILE_SUCCESS,
                user: res.body
            });
            if (cb) {
                cb();
            }
        });
    }

};
