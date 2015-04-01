'use strict';

var _ = require('lodash');

function Configuration(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
}

Configuration.prototype.getBaseUrl = function() {
    return this.baseUrl;
};

Configuration.prototype.getToken = function() {
    return this.token;
};

Configuration.prototype.setToken = function(token) {
    this.token = token;
};

Configuration.prototype.resetToken = function() {
    this.token = null;
};

Configuration.prototype.getAuthorizationHeader = function() {
    if (_.isObject(this.token)) {
        return _.capitalize(this.token.token_type) + ' ' + this.token.access_token;
    } else {
        return '';
    }
};

module.exports = Configuration;
