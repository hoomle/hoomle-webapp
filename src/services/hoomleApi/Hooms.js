'use strict';

var http = require('superagent');
var when = require('when');

/**
 * Constructor
 * @param configuration
 */
function Hooms(configuration) {
    this.configuration = configuration;
}

/**
 * Retrieve Hooms by its slug
 *
 * @param slug
 * @returns Promise
 */
Hooms.prototype.getBySlug = function(slug) {
    return when.promise(function(resolve, reject) {
        http.get(this.configuration.getBaseUrl() + '/hooms/' + slug)
            .accept('application/json')
            .end(function (err, res) {
                if (err) {
                    return reject(err);
                }

                // TODO Refactor with an hoomleApi Error object
                if (res.statusType === 4) {
                    return reject(res.body);
                }

                return resolve(res.body);
            });
    }.bind(this));
};

/**
 * Create new Hooms (Profile & Homepage)
 *
 * @param {Object} hooms
 * @param {boolean} dryrun
 * @returns Promise
 */
Hooms.prototype.create = function(hooms, dryrun) {
    dryrun = dryrun || false;
    var dryrunQueryString = '';

    if (dryrun) {
        dryrunQueryString = '?dryrun';
    }

    return when.promise(function(resolve, reject) {
        http
            .post(this.configuration.getBaseUrl() + '/hooms' + dryrunQueryString)
            .send(hooms)
            .accept('application/json')
            .end(function(err, res) {
                if (err) {
                    return reject(err);
                }

                // TODO Refactor with an hoomleApi Error object
                if (res.statusType === 4) {
                    return reject(res.body);
                }

                return resolve(res.body);
            });
    }.bind(this));
};

/**
 * Get current hooms (for the user authenticated)
 *
 * @returns Promise
 */
Hooms.prototype.getMe = function() {
    return when.promise(function(resolve, reject) {
        http
            .get(this.configuration.getBaseUrl() + '/me/hooms')
            .set('Authorization', this.configuration.getAuthorizationHeader())
            .accept('application/json')
            .end(function(err, res) {
                if (err) {
                    return reject(err);
                }

                // TODO Refactor with an hoomleApi Error object
                if (res.statusType === 4) {
                    return reject(res.body);
                }

                return resolve(res.body);
            });
    }.bind(this));
};

module.exports = Hooms;
