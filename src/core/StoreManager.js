'use strict';

import fluxIsomorphicHelpers from 'flux-isomorphic-helpers';
import ProfileStore from '../stores/ProfileStore';

var storeManager = new fluxIsomorphicHelpers.StoreManager();
storeManager.add(ProfileStore);

module.exports = storeManager;
