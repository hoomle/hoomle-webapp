'use strict';

var React = require('react');
var InputField = require('react-form-validator').components.InputField;
var PasswordField = require('react-form-validator').components.PasswordField;
var v = require('react-form-validator').validators;
var FormValidation = require('react-form-validator').mixins.FormValidation;
var authenticationActions = require('../actions/authenticationActions');
var vHooms = require('../validators').Hooms;
var Navigation = require('react-router').Navigation;
var SessionStore = require('../stores/SessionStore');

/**
 * React class to handle the rendering of the login page
 *
 * @class Login
 * @constructor
 */
var Login = React.createClass({

    mixins: [FormValidation, Navigation],

    componentDidMount: function() {
        SessionStore.onChange(this._onStoreChange);
    },

    componentWillUnmount: function() {
        SessionStore.off(this._onStoreChange);
    },

    _onStoreChange: function() {
        this.setState(SessionStore.getState());
    },

    handleClick: function() {
        this.validateForm()
            .then(function(values) {
                console.log('login: ' + values.email);
                console.log('password: ' + values.password);

                authenticationActions.byCredentials(values.email, values.password)
                    .then(function() {
                        console.log('redirect to homepage');
                        this.transitionTo('homepage');
                    }.bind(this));

            }.bind(this), function(err) {
                console.log('validateForm error');
                console.log(err);
            });
    },

    render: function() {
        return (
            <div>
                Login
                <form>
                    <div>
                        <label>email</label>
                        <InputField name="email" ref="emailInput" validators={[v.String.min(3), v.String.max(50), v.String.email()]} />
                    </div>
                    <div>
                        <label>password</label>
                        <PasswordField name="password" ref="passwordInput" validators={[v.String.min(3), v.String.max(45)]} />
                    </div>
                    <input type="button" value="Register" onClick={this.handleClick} />
                </form>
            </div>
        );
    }

});

module.exports = Login;
