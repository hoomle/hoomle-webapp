'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('eventemitter3');
var assign = require('react/lib/Object.assign');

var _homepage = {};
var _loading = false;
var CHANGE_EVENT = 'change';

var HomepageStore = assign({}, EventEmitter.prototype, {

    name: 'HomepageStore',

    getState: function() {
        return {
            homepage: _homepage,
            loading: _loading
        };
    },

    loadHomepage: function(homepage) {
        _homepage = homepage;
    },

    getHomepage: function() {
        return _homepage;
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
            homepage: _homepage,
            loading: _loading
        };
    },

    unserialize: function(payload) {
        _homepage = payload.homepage;
        _loading = payload.loading;
    }
});

HomepageStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {

        case ActionTypes.LOAD_HOMEPAGE_SUCCESS:
            HomepageStore.loadHomepage(action.homepage);
            HomepageStore.emitChange();
            break;

        default:
            return true;
    }

    return true;
});

module.exports = HomepageStore;
