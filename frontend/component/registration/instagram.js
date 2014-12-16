/* global angular */

'use strict';

/**
 * @ngdoc directive
 * @module hoole.components.registration.instagram
 * @name hoole.components.registration.instagram.ctrl
 */
angular.module('hoole.components.registration.instagram', [])
    .controller('hoole.components.registration.instagram.ctrl', ['$log', function($log) {
        $log.info('hoole.components.registration.instagram.ctrl');
    }])
    .directive('hooleRegformInstagram', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/registration/instagram.html',
            link: function(scope, element, attrs) {
                scope.values = {
                    photoUrl: attrs.photoUrl,
                    username: attrs.username,
                    email: attrs.email,
                    bio: attrs.bio
                };
            }
        };
    });
