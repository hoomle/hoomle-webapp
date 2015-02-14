'use strict';

import keyMirror from 'react/lib/keyMirror';

var ActionTypes = keyMirror({
    LOAD_PROFILE: null,
    LOAD_PROFILE_SUCCESS: null,
    LOAD_PROFILE_ERROR: null
});

module.exports = ActionTypes;
