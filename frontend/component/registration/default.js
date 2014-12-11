/* global angular */

'use strict';

/**
 * @ngdoc controller
 * @module hoole.components.registration.default
 * @name hoole.components.registration.default.ctrl
 */
angular.module('hoole.components.registration.default', [
        'hoole.api',
        'lodash'
    ])
    .controller('hoole.components.registration.default.ctrl', ['$log', function($log) {

        $log.info('hoole.components.registration.default.ctrl');

    }]);
