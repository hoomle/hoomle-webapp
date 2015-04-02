'use strict';

var http = require('superagent');
var when = require('when');

/**
 * Authentication
 * @param configuration
 */
function Authentication(configuration) {
    this.configuration = configuration;
}

/**
 * Authenticate user on the API
 *
 * @param slug
 * @returns Promise
 */
Authentication.prototype.getAccessToken = function(email, password) {
    return when.promise(function(resolve, reject) {
        http.post(this.configuration.getBaseUrl() + '/oauth/access_token')
            .type('form')
            .send({ 'grant_type': 'password'})
            .send({ 'username': email })
            .send({ 'password': password })
            .send({ 'client_id': 'webapp' })
            .send({ 'client_secret': 'secret' })
            .end(function (err, res) {
                if (err) {
                    return reject(err);
                }

                // TODO Refactor with an hoomleApi Error object
                if (res.statusType === 4) {
                    return reject(res.body);
                }

                return resolve(res.body);
            }.bind(this));
    }.bind(this));
};

module.exports = Authentication;
