'use strict';

var fluxIsomorphicHelpers = require('flux-isomorphic-helpers');
var UserHomepageStore = require('../stores/UserHomepageStore');
var SessionStore = require('../stores/SessionStore');

var storeManager = new fluxIsomorphicHelpers.StoreManager();
storeManager.add(UserHomepageStore);
storeManager.add(SessionStore);

module.exports = storeManager;
