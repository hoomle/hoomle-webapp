'use strict';

import fluxIsomorphicHelpers from 'flux-isomorphic-helpers';
import HomepageStore from '../stores/HomepageStore';
import HoomStore from '../stores/HoomStore';

var storeManager = new fluxIsomorphicHelpers.StoreManager();
storeManager.add(HomepageStore);
storeManager.add(HoomStore);

module.exports = storeManager;
