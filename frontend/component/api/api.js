/* global angular */

'use strict';

/**
 * @ngdoc module
 * @name hoole.api
 * @module hoole.api
 * @description Module that take care of the API logic.
 */
angular
    .module('hoole.api', [
        'hoole.api.config',
        'hoole.api.manager.users',
        'hoole.api.helper.errors'
    ])
    .run(['ApiConfig', '$log', function(ApiConfig, $log) {
        if (!ApiConfig.URL) {
            $log.error('api-config:configuration Your API URL is not set! Use ApiConfigProvider.setUrl(API_URL)');
        }
    }]);
