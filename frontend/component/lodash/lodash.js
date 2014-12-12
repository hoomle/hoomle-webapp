/* global angular */

'use strict';

/**
 * @ngdoc factory
 * @module lodash
 * @name _
 * @description Load 'lodash' into a ng module
 */
angular.module('lodash', [])
    .factory('_', function () {
        // assumes underscore has already been loaded on the page
        return window._;
    });
