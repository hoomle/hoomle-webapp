'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var hoomleApi = require('../config').hoomleApi;

module.exports = function(hooms) {
    Dispatcher.handleViewAction({
        actionType: ActionTypes.REGISTRATION_PENDING,
        hooms: hooms
    });

    hoomleApi.Hooms
        .create(hooms)
        .then(function(newHooms) {
            console.log('REGISTRATION_SUCCESS: ');
            console.log(newHooms);
            Dispatcher.handleServerAction({
                actionType: ActionTypes.REGISTRATION_SUCCESS,
                hooms: newHooms
            });
        }, function(err) {
            console.log('REGISTRATION_ERROR: ');
            console.log(err);
            Dispatcher.handleServerAction({
                actionType: ActionTypes.REGISTRATION_ERROR,
                hooms: hooms,
                err: err
            });
        });
}
