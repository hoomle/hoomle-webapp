'use strict';

var fluxIsomorphicHelpers = require('flux-isomorphic-helpers');
var UserHomepageStore = require('../stores/UserHomepageStore');

var storeManager = new fluxIsomorphicHelpers.StoreManager();
storeManager.add(UserHomepageStore);

module.exports = storeManager;
