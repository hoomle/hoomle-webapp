'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('eventemitter3');
var assign = require('react/lib/Object.assign');

var _token = {};
var _hooms = {};
var _logged = false;
var CHANGE_EVENT = 'change';

var SessionStore = assign({}, EventEmitter.prototype, {

    name: 'SessionStore',

    getState: function() {
        return {
            token: _token,
            hooms: _hooms,
            isLogged: _logged
        };
    },

    setToken: function(token) {
        _token = token;
    },

    setHooms: function(hooms) {
        _hooms = hooms;
    },

    setLogged: function(logged) {
        _logged = logged;
    },

    getToken: function() {
        return _token;
    },

    getHooms: function() {
        return _token;
    },

    isLogged: function() {
        return _logged;
    },

    emitChange: function() {
        return this.emit(CHANGE_EVENT);
    },

    onChange: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    off: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    serialize: function() {
        return {
            token: _token,
            hooms: _hooms,
            isLogged: _logged
        };
    },

    unserialize: function(payload) {
        _token = payload.token;
        _hooms = payload.hooms;
        _logged = payload.isLogged;
    }
});

SessionStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {

        case ActionTypes.AUTHENTICATION_SUCCESS:
            console.log('SessionStore AUTHENTICATION_SUCCESS START');
            SessionStore.setToken(action.token);
            SessionStore.setHooms(action.hooms);
            SessionStore.setLogged(true);
            SessionStore.emitChange();
            console.log('SessionStore AUTHENTICATION_SUCCESS END');
            break;

        default:
            return true;
    }

    return true;
});

module.exports = SessionStore;
