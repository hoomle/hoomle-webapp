/* global angular */

'use strict';

/**
 * @ngdoc provider
 * @module hoole.api.config
 * @name ApiConfig
 * @description Configure the API module.
 */
angular.module('hoole.api.config', [])
    .provider('ApiConfig', function () {
        var _URL;
        var _language;

        /**
         * @ngdoc method
         * @module hoole.api
         * @name ApiConfig#setURL
         * @param {String} API_URL the path to the API
         * @kind function
         */
        this.setUrl = function (API_URL) {
            _URL = API_URL;
        };

        /**
         * @ngdoc method
         * @module hoole.api
         * @name ApiConfig#setLanguage
         * @param {String} language the language specify when a request are thrown
         * @kind function
         */
        this.setLanguage = function (language) {
            _language = language;
        };

        this.$get = function() {
            return {
                URL: _URL,
                language: _language
            };
        };
    });
