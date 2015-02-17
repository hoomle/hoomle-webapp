'use strict';

import keyMirror from 'react/lib/keyMirror';

var ActionTypes = keyMirror({
    LOAD_HOMEPAGE: null,
    LOAD_HOMEPAGE_SUCCESS: null,
    LOAD_HOMEPAGE_ERROR: null
});

module.exports = ActionTypes;
