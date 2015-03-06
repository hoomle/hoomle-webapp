'use strict';

var React = require('react');
var when = require('when');
var _ = require('lodash');
var InputField = require('./Form/InputField');

/**
 * React class to handle the rendering of the registration page
 *
 * @class Registration
 * @constructor
 */
var Registration = React.createClass({

    handleClick: function() {
        // Explicitly focus the text input using the raw DOM API.
        console.log('Registration:handleClick');
        console.log('username: '            + this.refs.usernameInput.getDOMNode().value);
        console.log('display name: '        + this.refs.displayNameInput.getDOMNode().value);
        console.log('email: '               + this.refs.emailInput.getDOMNode().value);
        console.log('password: '            + this.refs.passwordInput.getDOMNode().value);
        // this.refs.usernameInput.validate();
    },

    render: function() {

        var validator1 = function(e) {
            console.log('validator1: ' + e);
            return when.promise(function(resolve, reject) {
                setTimeout(function() {
                    if (e === 'kevin') {
                        resolve();
                    } else {
                        reject({
                            message: 'you have to call you kevin'
                        });
                    }
                }, 2000);
            });
        };

        return (
            <div>
                Registration
                <form>
                    <div>
                        <label>username</label>
                        <InputField name="username" ref="usernameInput" validateOn="onBlur" validators={[validator1]} />
                    </div>
                    <div>
                        <label>display name</label>
                        <InputField name="displayname" ref="displayNameInput" />
                    </div>
                    <div>
                        <label>email</label>
                        <InputField name="email" ref="emailInput" />
                    </div>
                    <div>
                        <label>password</label>
                        <input name="password" ref="passwordInput" type="password" />
                    </div>
                        <input
                            type="button"
                            value="Register"
                            onClick={this.handleClick} />
                </form>
            </div>
        );
    }

});

module.exports = Registration;
