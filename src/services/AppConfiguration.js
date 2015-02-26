'use strict';

function AppConfiguration(env, port, apiMockEnabled) {
    this.env = env;
    this.port = port;
    this.apiMockEnabled = apiMockEnabled;
}

AppConfiguration.prototype.getEnv = function() {
    return this.env;
};

AppConfiguration.prototype.getPort = function() {
    return this.port;
};

AppConfiguration.prototype.isApiMockEnabled = function() {
    return this.apiMockEnabled;
};

module.exports = AppConfiguration;
