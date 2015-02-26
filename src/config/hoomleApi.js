'use strict';

var hoomleApi = require('../services/hoomleApi');

var configuration = new hoomleApi.Configuration(
    process.env.HOOMLE_API_BASE_URL || 'http://localhost:5000/api/v1'
);

module.exports = {
    Hooms       : new hoomleApi.Hooms(configuration),
    Homepages   : new hoomleApi.Homepages(configuration)
};
