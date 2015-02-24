'use strict';

class Configuration {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getBaseUrl() {
        return this.baseUrl;
    }
}

module.exports = Configuration;
