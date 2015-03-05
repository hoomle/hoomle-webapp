'use strict';

var React = require('react');
var classNames = require('classnames');
var FieldValidation = require('../mixins/FieldValidation');
var objectAssign = require('object-assign');

/**
 * React class to handle the rendering of the InputField
 *
 * @class InputField
 * @constructor
 */
var InputField = React.createClass({

    displayName: 'InputField',
    mixins: [FieldValidation],

    propTypes: {
        validators: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ]),
        validateOn: React.PropTypes.string
    },

    getInitialState: function() {
        // Put the state inside the empty object
        return objectAssign({}, this.getInitialValidationState());
    },

    render: function() {
        var classes = classNames(this.getValidationStateClasses());

        var err;
        if (this.state.validation.invalid) {
            err = (<span className="validationErrorMessage" dangerouslySetInnerHTML={{__html: this.state.validation.err.message}} />);
        }

        return (
            <div className="InputField">
                <input type="text" ref="field" className={classes} {...this.props} {...this.mapActionsEventsListener()} />
                {err}
            </div>
        );
    }
});

module.exports = InputField;
