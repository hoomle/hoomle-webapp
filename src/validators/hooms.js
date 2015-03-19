'use strict';

var when            = require('when');
var _               = require('lodash');
var hoomleApi       = require('../config').hoomleApi;
var stringValidator = require('react-form-validator').validators.String;

var HoomsValidators = {

    property: function(propertyName) {
        return function(value) {
            return stringValidator.is()(value)
                .then(function(valueResolved) {
                    var valueToValidate = {};
                    valueToValidate[propertyName] = valueResolved;
                    return hoomleApi.Hooms.create(valueToValidate, true)
                        .then(function(res) {
                            console.log('HoomsValidators.property res');
                            console.log(res);
                            return when.resolve(valueResolved);
                        }, function(err) {
                            // TODO Refactor with an hoomleApi Error object
                            if (_.has(err, 'errors') && err.errors.length > 0) {
                                return when.reject({
                                    code: err.errors[0].code,
                                    message: err.errors[0].message
                                });
                            } else {
                                // TODO Throw a generic error instead of a success
                                return when.resolve(valueResolved);
                            }
                        });
                });
        };
    }
};

module.exports = HoomsValidators;