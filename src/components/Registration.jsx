'use strict';

var React = require('react');
var InputField = require('react-form-validator').components.InputField;
var PasswordField = require('react-form-validator').components.PasswordField;
var FormValidation = require('react-form-validator').mixins.FormValidation;
var registrationAction = require('../actions/registrationAction');
var vHooms = require('../validators').Hooms;
var Navigation = require('react-router').Navigation;

/**
 * React class to handle the rendering of the registration page
 *
 * @class Registration
 * @constructor
 */
var Registration = React.createClass({

    mixins: [FormValidation, Navigation],

    handleClick: function() {
        this.validateForm()
            .then(function(values) {
                registrationAction(values, this)
                    .then(function(hooms) {
                        console.log('route to homepage from initiale component');
                        this.transitionTo('userHomepage', {slug: hooms.homepage.slug});
                    }.bind(this));
            }.bind(this), function(err) {
                console.log('validateForm error');
                console.log(err);
            });
    },

    render: function() {
        return (
            <div>
                Registration
                <form>
                    <div>
                        <label>username</label>
                        <InputField name="slug" ref="slugInput"
                            validators={[vHooms.property('slug')]} />
                    </div>
                    <div>
                        <label>display name</label>
                        <InputField name="displayName" ref="displayNameInput"
                            validators={[vHooms.property('displayName')]} />
                    </div>
                    <div>
                        <label>email</label>
                        <InputField name="email" ref="emailInput"
                            validators={[vHooms.property('email')]} />
                    </div>
                    <div>
                        <label>password</label>
                        <PasswordField name="password" ref="passwordInput"
                            validators={[vHooms.property('password')]} />
                    </div>
                    <input type="button" value="Register" onClick={this.handleClick} />
                </form>
            </div>
        );
    }

});

module.exports = Registration;
