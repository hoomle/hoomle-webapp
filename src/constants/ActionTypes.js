'use strict';

var keyMirror = require('react/lib/keyMirror');

var ActionTypes = keyMirror({
    LOAD_USER_HOMEPAGE_PENDING: null,
    LOAD_USER_HOMEPAGE_SUCCESS: null,
    LOAD_USER_HOMEPAGE_ERROR: null,

    REGISTRATION_PENDING: null,
    REGISTRATION_SUCCESS: null,
    REGISTRATION_ERROR: null,

    AUTHENTICATION_PENDING: null,
    AUTHENTICATION_SUCCESS: null,
    AUTHENTICATION_ERROR: null
});

module.exports = ActionTypes;
