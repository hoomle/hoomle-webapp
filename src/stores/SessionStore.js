'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('eventemitter3');
var assign = require('react/lib/Object.assign');

var SessionStore = assign({}, EventEmitter.prototype, {

    name: 'SessionStore',

    _token: {},
    _hooms: {},
    _logged: false,
    CHANGE_EVENT: 'change',

    getState: function() {
        return {
            token: this._token,
            hooms: this._hooms,
            isLogged: this._logged
        };
    },

    setToken: function(token) {
        this._token = token;
    },

    setHooms: function(hooms) {
        this._hooms = hooms;
    },

    setLogged: function(logged) {
        this._logged = logged;
    },

    getToken: function() {
        return this._token;
    },

    getHooms: function() {
        return this._token;
    },

    isLogged: function() {
        return this._logged;
    },

    emitChange: function() {
        return this.emit(this.CHANGE_EVENT);
    },

    onChange: function(callback) {
        this.on(this.CHANGE_EVENT, callback);
    },

    off: function(callback) {
        this.removeListener(this.CHANGE_EVENT, callback);
    },

    serialize: function() {
        return {
            token: this._token,
            hooms: this._hooms,
            isLogged: this._logged
        };
    },

    unserialize: function(payload) {
        this._token = payload.token;
        this._hooms = payload.hooms;
        this._logged = payload.isLogged;
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
