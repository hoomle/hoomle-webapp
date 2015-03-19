'use strict';

var hoomleApi = require('../services/hoomleApi');

var configuration = new hoomleApi.Configuration(
    process.env.HOOMLE_API_BASE_URL || 'http://api.hoomle.dev'
);

module.exports = {
    Hooms      : new hoomleApi.Hooms(configuration)
};
