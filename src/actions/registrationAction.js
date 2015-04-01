'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var hoomleApi = require('../config').hoomleApi;
var when = require('when');

module.exports = function(hooms) {
    Dispatcher.handleViewAction({
        actionType: ActionTypes.REGISTRATION_PENDING,
        hooms: hooms
    });

    return hoomleApi.Hooms
        .create(hooms)
        .then(function(newHooms) {
            console.log('REGISTRATION_SUCCESS: ');
            console.log(newHooms);
            Dispatcher.handleServerAction({
                actionType: ActionTypes.REGISTRATION_SUCCESS,
                hooms: newHooms
            });
            return when.resolve(newHooms);
        }, function(err) {
            console.log('REGISTRATION_ERROR: ');
            console.log(err);
            Dispatcher.handleServerAction({
                actionType: ActionTypes.REGISTRATION_ERROR,
                hooms: hooms,
                err: err
            });
            return when.reject({
                hooms: hooms,
                err: err
            });
        });
};
