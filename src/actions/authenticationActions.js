'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var hoomleApi = require('../config').hoomleApi;
var when = require('when');
var cookie = require('../core/cookie');

var byCredentials = function(email, password) {
    Dispatcher.handleViewAction({
        actionType: ActionTypes.AUTHENTICATION_PENDING,
        email: email
    });

    return hoomleApi.Authentication
        .getAccessToken(email, password)
        .then(function(token) {
            console.log('AUTHENTICATION_SUCCESS: ');
            console.log(token);

            hoomleApi.Hooms.getMe()
                .then(function(hooms) {
                    console.log('current hooms');
                    console.log(hooms);

                    Dispatcher.handleServerAction({
                        actionType: ActionTypes.AUTHENTICATION_SUCCESS,
                        token: token,
                        hooms: hooms
                    });
                    cookie.set('hoomsess', token, { isJson: true });
                });

            return when.resolve();
        }, function(err) {
            console.log('AUTHENTICATION_ERROR: ');
            console.log(err);
            Dispatcher.handleServerAction({
                actionType: ActionTypes.AUTHENTICATION_ERROR,
                email: email,
                err: err
            });
            return when.reject({
                email: email,
                err: err
            });
        });
};

module.exports = {
    byCredentials: byCredentials
};
