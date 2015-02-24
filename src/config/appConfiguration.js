'use strict';

import AppConfiguration from '../services/AppConfiguration';

var appConfiguration = new AppConfiguration(
    process.env.HOOMLE_WEBAPP_ENV || 'dev',
    process.env.HOOMLE_WEBAPP_PORT || 5000,
    process.env.HOOMLE_WEBAPP_APIMOCK || true
);

// Set global variables (used by React)
global.__DEV__ = appConfiguration.getEnv() === 'dev';

module.exports = appConfiguration;
