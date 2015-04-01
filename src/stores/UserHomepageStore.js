'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('eventemitter3');
var assign = require('react/lib/Object.assign');

var _hooms = {};
var _loading = false;
var CHANGE_EVENT = 'change';

var UserHomepageStore = assign({}, EventEmitter.prototype, {

    name: 'UserHomepageStore',

    getState: function() {
        return {
            hooms: _hooms,
            loading: _loading
        };
    },

    loadHooms: function(hooms) {
        _hooms = hooms;
    },

    getHooms: function() {
        return _hooms;
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
            hooms: _hooms,
            loading: _loading
        };
    },

    unserialize: function(payload) {
        _hooms = payload.hooms;
        _loading = payload.loading;
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
