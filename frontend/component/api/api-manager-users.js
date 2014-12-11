/* global angular */

'use strict';

/**
 * @ngdoc factory
 * @module hoole.api.manager.users
 * @name AccountsManager
 * @description Manager of account business logic
 */
angular.module('hoole.api.manager.users', [
        'hoole.api.config'
    ])
    .factory('AccountsManager', ['$q', '$http', 'ApiConfig', '$log', function ($q, $http, ApiConfig, $log) {
        var create = function(accountMember) {
            return $http.post(ApiConfig.URL + '/accounts', accountMember)
                .then(function (res) {
                    $log.info('accounts-manager:api register a new account');
                    return res.data.accounts;
                }, function (res) {
                    $log.error('accounts-manager:api register a new account');
                    return $q.reject(res.data.errors);
                });
        };

        var createDryRun = function(accountMember) {
            return $http.post(ApiConfig.URL + '/accounts/?dryrun=1', accountMember)
                .then(function () {
                    $log.info('accounts-manager:api validation');
                }, function (res) {
                    $log.error('accounts-manager:api validation');
                    return $q.reject(res.data.errors);
                });
        };

        return {
            create: create,
            createDryRun: createDryRun
        };
    }]);
