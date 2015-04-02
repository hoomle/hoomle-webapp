'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var hoomleApi = require('../config').hoomleApi;
var when = require('when');
var _ = require('lodash');
var cookie = require('../core/cookie');

var authenticate = function(email, password) {
    console.log('sessionActions.AUTHENTICATE Start');
    Dispatcher.handleViewAction({
        actionType: ActionTypes.AUTHENTICATION_PENDING,
        email: email
    });

    var _token;
    return hoomleApi.Authentication
        .getAccessToken(email, password)
        .then(function(token) {
            _token = token;
            return hoomleApi.Hooms.getMe(token);
        })
        .then(function(hooms) {
            console.log('sessionActions.AUTHENTICATE Success');

            Dispatcher.handleServerAction({
                actionType: ActionTypes.AUTHENTICATION_SUCCESS,
                token: _token,
                hooms: hooms
            });
            cookie.set('hoomsess', _token, { isJson: true });

            return when.resolve();
        })
        .then(null, function(err) {
            console.log('sessionActions.AUTHENTICATE Error');

            Dispatcher.handleServerAction({
                actionType: ActionTypes.AUTHENTICATION_ERROR,
                email: email,
                err: err
            });
            cookie.expire('hoomsess');

            return when.reject({
                email: email,
                err: err
            });
        });
};

var load = function() {
    console.log('sessionActions.LOAD Start');
    var _token = cookie.get('hoomsess', { isJson: true });

    if (!_token || _.isEmpty(_token)) {
        return when.reject();
    }

    return hoomleApi.Hooms.getMe(_token)
        .then(function(hooms) {
            console.log('sessionActions.LOAD Success');

            Dispatcher.handleServerAction({
                actionType: ActionTypes.AUTHENTICATION_SUCCESS,
                token: _token,
                hooms: hooms
            });

            return when.resolve();
        })
        .then(null, function(err) {
            console.log('sessionActions.LOAD Error');

            Dispatcher.handleServerAction({
                actionType: ActionTypes.AUTHENTICATION_ERROR,
                err: err
            });
            cookie.expire('hoomsess');

            return when.reject({
                err: err
            });
        });
};

module.exports = {
    authenticate: authenticate,
    load: load
};
