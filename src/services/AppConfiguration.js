'use strict';

class AppConfiguration {

    constructor(env, port, apiMockEnabled) {
        this.env = env;
        this.port = port;
        this.apiMockEnabled = apiMockEnabled;
    }

    getEnv() {
        return this.env;
    }

    getPort() {
        return this.port;
    }

    isApiMockEnabled() {
        return this.apiMockEnabled;
    }
}

module.exports = AppConfiguration;
