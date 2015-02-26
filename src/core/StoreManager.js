'use strict';

var fluxIsomorphicHelpers = require('flux-isomorphic-helpers');
var HomepageStore = require('../stores/HomepageStore');
var HoomStore = require('../stores/HoomStore');

var storeManager = new fluxIsomorphicHelpers.StoreManager();
storeManager.add(HomepageStore);
storeManager.add(HoomStore);

module.exports = storeManager;
