'use strict';

var keyMirror = require('react/lib/keyMirror');

var ActionTypes = keyMirror({

  LOAD_PAGE: null,
  LOAD_PAGE_SUCCESS: null,
  LOAD_PAGE_ERROR: null,
  CHANGE_LOCATION: null

});

module.exports = ActionTypes;
