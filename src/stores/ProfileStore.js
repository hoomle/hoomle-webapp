'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('eventemitter3');
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _user = {};
var _loading = false;

var ProfileStore = assign({}, EventEmitter.prototype, {

    getState() {
        return {
            user: _user,
            loading: _loading
        }
    },

    loadUser(user) {
        console.log('loadUser Store');
        _user = user;
        this.emitChange();
    },

    getUser() {
        return _user;
    },

    emitChange() {
        return this.emit(CHANGE_EVENT);
    },

    onChange(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    off(callback) {
        this.off(CHANGE_EVENT, callback);
    },

    name: 'ProfileStore',

    serialize() {
        return {
            user: _user,
            loading: _loading
        }
    },

    unserialize(payload) {
        _user = payload.user;
        _loading = payload.loading;
    }
});

ProfileStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {

        case ActionTypes.LOAD_PROFILE_SUCCESS:
            ProfileStore.loadUser(action.user);
            break;

        default:
        // Do nothing
    }

});

module.exports = ProfileStore;

