'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('eventemitter3');
var assign = require('react/lib/Object.assign');

var UserHomepageStore = assign({}, EventEmitter.prototype, {

    name: 'UserHomepageStore',

    _hooms: {},
    _loading: false,
    CHANGE_EVENT: 'change',

    getState: function() {
        return {
            hooms: this._hooms,
            loading: this._loading
        };
    },

    loadHooms: function(hooms) {
        this._hooms = hooms;
    },

    getHooms: function() {
        return this._hooms;
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
            hooms: this._hooms,
            loading: this._loading
        };
    },

    unserialize: function(payload) {
        this._hooms = payload.hooms;
        this._loading = payload.loading;
    }
});

UserHomepageStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {

        case ActionTypes.REGISTRATION_SUCCESS:
            UserHomepageStore.loadHooms(action.hooms);
            UserHomepageStore.emitChange();
            break;

        case ActionTypes.LOAD_USER_HOMEPAGE_SUCCESS:
            UserHomepageStore.loadHooms(action.hooms);
            UserHomepageStore.emitChange();
            break;

        default:
            return true;
    }

    return true;
});

module.exports = UserHomepageStore;
