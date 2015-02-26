'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('eventemitter3');
var assign = require('react/lib/Object.assign');
var _ = require('lodash');

/**
 * {
 *     'homepage_slug': [{
 *          loading: true|false,
 *          hooms: [{
 *              loading: true|false,
 *              id: '1234521421421',
 *              source: 'twitter',
 *              sourceUrl: 'http://source-url.com'
 *          }, { ... }
 *          ]
 *     }]
 * }
 */
var _hooms = {};
var _loading = false;
var CHANGE_EVENT = 'change';

var HoomStore = assign({}, EventEmitter.prototype, {

    name: 'HoomStore',

    getStateForHomepage: function(homepageSlug) {
        if (!_.has(_hooms, homepageSlug)) {
            this.initialLoadingHoomsForHomepage(homepageSlug);
        }

        return _hooms[homepageSlug];
    },

    getState: function() {
        return {
            hooms: _hooms,
            loading: _loading
        };
    },

    initialLoadingHoomsForHomepage: function(homepageSlug) {
        _hooms[homepageSlug] = {
            loading: true,
            hooms: []
        };
    },

    loadHoomsForHomepage: function(homepageSlug, hooms) {
        _hooms[homepageSlug].loading = false;
        _hooms[homepageSlug].hooms = hooms;
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
        this.off(CHANGE_EVENT, callback);
    },

    serialize: function() {
        // Need to implement
        return {};
    },

    unserialize: function(payload) {
        // Need to implement
    }
});

HoomStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {

        case ActionTypes.LOAD_HOOMS:
            HoomStore.initialLoadingHoomsForHomepage(action.homepageSlug);
            break;

        case ActionTypes.LOAD_HOOMS_SUCCESS:
            HoomStore.loadHoomsForHomepage(action.homepageSlug, action.hooms);
            break;

        default:
            return true;
    }

    HoomStore.emitChange();
    return true;
});

module.exports = HoomStore;
