'use strict';

var _ = require('lodash');

function Configuration(baseUrl) {
    this.baseUrl = baseUrl;
}

Configuration.prototype.getBaseUrl = function() {
    return this.baseUrl;
};

module.exports = Configuration;
