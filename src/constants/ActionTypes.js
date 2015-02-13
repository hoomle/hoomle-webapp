'use strict';

var keyMirror = require('react/lib/keyMirror');

var ActionTypes = keyMirror({
    LOAD_PAGE: null,
    LOAD_PAGE_SUCCESS: null,
    LOAD_PAGE_ERROR: null,
    CHANGE_LOCATION: null,

    LOAD_PROFILE: null,
    LOAD_PROFILE_SUCCESS: null,
    LOAD_PROFILE_ERROR: null
});

module.exports = ActionTypes;
