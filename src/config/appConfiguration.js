'use strict';

import AppConfiguration from '../services/AppConfiguration';

var appConfiguration = new AppConfiguration(
    process.env.ENV || 'dev',
    process.env.PORT || 5000,
    true
);

// Set global variables (used by React)
global.__DEV__ = appConfiguration.getEnv() === 'dev';

module.exports = appConfiguration;
