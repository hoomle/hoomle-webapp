'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';

var CHANGE_EVENT = 'change';

var _homepage = {};
var _loading = false;

var HomepageStore = assign({}, EventEmitter.prototype, {

    name: 'HomepageStore',

    getState() {
        return {
            homepage: _homepage,
            loading: _loading
        };
    },

    loadHomepage(homepage) {
        _homepage = homepage;
    },

    getHomepage() {
        return _homepage;
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

    serialize() {
        return {
            homepage: _homepage,
            loading: _loading
        };
    },

    unserialize(payload) {
        _homepage = payload.homepage;
        _loading = payload.loading;
    }
});

HomepageStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {

        case ActionTypes.LOAD_HOMEPAGE_SUCCESS:
            console.log('DISPATCHER:HomepageStore action=' + payload.action.actionType);
            HomepageStore.loadHomepage(action.homepage);
            break;

        default:
            return true;
    }

    HomepageStore.emitChange();
    return true;
});

module.exports = HomepageStore;
