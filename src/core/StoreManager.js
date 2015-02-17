'use strict';

import fluxIsomorphicHelpers from 'flux-isomorphic-helpers';
import HomepageStore from '../stores/HomepageStore';

var storeManager = new fluxIsomorphicHelpers.StoreManager();
storeManager.add(HomepageStore);

module.exports = storeManager;
