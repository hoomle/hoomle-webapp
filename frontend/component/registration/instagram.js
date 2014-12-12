/* global angular */

'use strict';

/**
 * @ngdoc directive
 * @module hoole.components.registration.instagram
 * @name hoole.components.registration.instagram.ctrl
 */
angular.module('hoole.components.registration.instagram', [])
    .controller('hoole.components.registration.instagram.ctrl', ['$log', '$scope', function($log, $scope) {

        $scope.values = {
            photoUrl: $scope.photoUrl,
            username: $scope.username,
            email: $scope.email,
            bio: $scope.bio
        };

        $log.info('hoole.components.registration.instagram.ctrl');
    }])
    .directive('hooleRegformInstagram', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/registration/instagram.html',
            scope: {
                photoUrl: '=photoUrl',
                username: '=username',
                email: '=email',
                bio: '=bio'
            }
        };
    });
