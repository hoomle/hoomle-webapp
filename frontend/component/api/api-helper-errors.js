/* global angular */

'use strict';

/**
 * @ngdoc factory
 * @module hoole.api.helper.errors
 * @name ApiHelperErrors
 * @description Helper to work with API errors
 */
angular.module('hoole.api.helper.errors', [
        'lodash'
    ])
    .factory('ApiHelperErrors', ['_', function (_) {

        var helper = {};

        helper.getError = function (code, path, errors) {

            if (!_.isArray(errors)) {
                return undefined;
            }

            return _.find(errors, function(err) {
                return err.code === code && path === err.path;
            });
        };

        helper.hasError = function (code, path, errors) {
            return this.getError(code, path, errors) !== undefined;
        };

        helper.getErrorsByPath = function(path, errors) {

            if (!_.isArray(errors)) {
                return undefined;
            }

            return _.filter(errors, function(error) {
                return error.path === path;
            });
        };

        helper.getFirstErrorByPath = function(path, errors) {

            var pathErrors = this.getErrorsByPath(path, errors);

            if (!_.isArray(pathErrors) && pathErrors.length > 0) {
                return undefined;
            }

            return pathErrors[0];
        };

        helper.resetErrors = function(ngModel) {
            _.forIn(ngModel.$error, function(value, key) {
                ngModel.$setValidity(key, true);
            });
        };

        helper.mapErrorsAndField = function(apiError, field, errors, ngModel) {

            var that = this;

            var errorsList = [];
            if (_.isArray(apiError)) {
                _(apiError).forEach(function(errorMapping) {
                    var err;
                    if (_.has(errorMapping, 'code') && _.has(errorMapping, 'path')) {
                        err = that.getError(errorMapping.code, errorMapping.path, errors);
                    } else if (_.isString(errorMapping)) {
                        err = that.getFirstErrorByPath(errorMapping, errors);
                    }

                    if (err !== undefined) {
                        errorsList.push(err);
                    }
                });
            } else if (_.isString(apiError)) {
                errorsList = that.getErrorsByPath(apiError, errors);
            }

            if (errorsList.length > 0) {

                // Add errors to UI from the API's errors
                var errorsAdded = [];
                _(errorsList).forEach(function(error) {
                    ngModel[field].$setValidity(error.code.toLowerCase(), false);
                    errorsAdded.push(error.code.toLowerCase());
                });

                // Unbind all errors which are not added
                _.forIn(ngModel[field].$error, function(value, key) {
                    if (_.indexOf(errorsAdded, key) === -1) {
                        ngModel[field].$setValidity(key, true);
                    }
                });
            } else {
                that.resetErrors(ngModel[field]);
            }
        };

        return helper;
    }]);
