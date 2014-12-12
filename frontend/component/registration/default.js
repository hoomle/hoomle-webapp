/* global angular */

'use strict';

/**
 * @ngdoc directive
 * @module hoole.components.registration.default
 * @name hoole.components.registration.default.ctrl
 */
angular.module('hoole.components.registration.default', [])
    .controller('hoole.components.registration.default.ctrl', ['$log', function($log) {
        $log.info('hoole.components.registration.default.ctrl');
    }])
    .directive('hooleRegform', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/registration/default.html'
        };
    });
