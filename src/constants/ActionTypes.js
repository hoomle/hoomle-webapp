'use strict';

var keyMirror = require('react/lib/keyMirror');

var ActionTypes = keyMirror({
    LOAD_HOMEPAGE: null,
    LOAD_HOMEPAGE_SUCCESS: null,
    LOAD_HOMEPAGE_ERROR: null,

    LOAD_HOOMS: null,
    LOAD_HOOMS_SUCCESS: null,
    LOAD_HOOMS_ERROR: null,

    LOAD_HOOM_EMBED_CODE: null,
    LOAD_HOOM_EMBED_CODE_SUCCESS: null,
    LOAD_HOOM_EMBED_CODE_ERROR: null,

    REGISTRATION_PENDING: null,
    REGISTRATION_SUCCESS: null,
    REGISTRATION_ERROR: null
});

module.exports = ActionTypes;
