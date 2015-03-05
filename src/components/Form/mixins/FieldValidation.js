'use strict';

var sequence = require('when/sequence');
var _ = require('lodash');
var objectAssign = require('object-assign');

var FieldValidation = {

    getInitialValidationState: function() {
        return {
            validation: {
                pending: false,
                valid: true,
                invalid: false
            }
        };
    },

    isValid: function() {
        return this.state.validation.valid;
    },

    getValidationStateClasses: function() {
        return {
            validationPending: this.state.validation.pending,
            validationValid: this.state.validation.valid,
            validationInvalid: this.state.validation.invalid
        };
    },

    getValidors: function() {
        var validators = [];

        if (_.isFunction(this.props.validators)) {
            validators.push(this.props.validators);
        } else if (_.isArray(this.props.validators)) {
            validators = this.props.validators;
        }

        return validators;
    },

    validate: function() {
        // Update the "validation state" of the component state
        var updateValidationState = function(value) {
            var validationState = objectAssign({}, this.state.validation, value);
            var state = objectAssign({}, this.state);
            state.validation = validationState;
            this.setState(state);
        }.bind(this);

        var value = this.refs.field.getDOMNode().value;
        var validators = this.getValidors();

        // Mark the validation as "pending"
        updateValidationState({
            pending: true
        });
        sequence(validators, value)
            .then(function() {
                updateValidationState({
                    pending: false,
                    valid: true,
                    invalid: false
                });
            }, function(err) {
                updateValidationState({
                    pending: false,
                    valid: false,
                    invalid: true,
                    err: err
                });
            });
    },

    mapActionsEventsListener: function() {
        // if the prop 'validateOn' is empty
        if(_.isEmpty(this.props.validateOn)) {
            return {};
        }

        var events = this.props.validateOn.split(' ');
        var validateOnEvents = {};
        _.forEach(events, function(eventName) {
            // Check if the event is supported
            // http://facebook.github.io/react/docs/events.html#supported-events
            validateOnEvents[eventName] = function() {
                this.validate();
            }.bind(this);
        }.bind(this));

        return validateOnEvents;
    }

};

module.exports = FieldValidation;