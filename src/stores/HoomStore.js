'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import _ from 'lodash';

var CHANGE_EVENT = 'change';

/**
 * {
 *     'homepage_slug': [{
 *          loading: true|false,
 *          hooms: [{
 *              loading: true|false,
 *              id: '1234521421421',
                source: 'twitter',
                sourceUrl: 'http://source-url.com'
 *          }, { ... }
 *          ]
 *     }]
 * }
 */
var _hooms = {};
var _loading = false;

var HoomStore = assign({}, EventEmitter.prototype, {

    name: 'HoomStore',

    getStateForHomepage(homepageSlug) {
        if (!_.has(_hooms, homepageSlug)) {
            this.initialLoadingHoomsForHomepage(homepageSlug);
        }

        return _hooms[homepageSlug];
    },

    getState() {
        return {
            hooms: _hooms,
            loading: _loading
        };
    },

    initialLoadingHoomsForHomepage(homepageSlug) {
        console.log('HoomStore:initialLoadingHoomsForHomepage(' + homepageSlug + ')');
        _hooms[homepageSlug] = {
            loading: true,
            hooms: []
        };
    },

    loadHoomsForHomepage(homepageSlug, hooms) {
        console.log('HoomStore:loadHoomsForHomepage(' + homepageSlug + ')');
        _hooms[homepageSlug].loading = false;
        _hooms[homepageSlug].hooms = hooms;
    },

    getHooms() {
        return _hooms;
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
        // Need to implement
        return {};
    },

    unserialize(payload) {
        // Need to implement
    }
});

HoomStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {

        case ActionTypes.LOAD_HOOMS:
            console.log('DISPATCHER:HoomStore action=' + payload.action.actionType);
            HoomStore.initialLoadingHoomsForHomepage(action.homepageSlug);
            break;

        case ActionTypes.LOAD_HOOMS_SUCCESS:
            console.log('DISPATCHER:HoomStore action=' + payload.action.actionType);
            HoomStore.loadHoomsForHomepage(action.homepageSlug, action.hooms);
            break;

        default:
            return true;
    }

    HoomStore.emitChange();
    return true;
});

module.exports = HoomStore;
