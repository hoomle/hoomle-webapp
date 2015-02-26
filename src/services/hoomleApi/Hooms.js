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
 * Retrieve hooms by its homepage slug
 *
 * @param homepageSlug
 * @returns Promise
 */
Hooms.prototype.getByHomepageSlug = function(homepageSlug) {
    return when.promise(function(resolve, reject) {
        http.get(this.configuration.getBaseUrl() + '/homepage/' + homepageSlug + '/hooms')
            .accept('application/json')
            .end(function (err, res) {
                return err ? reject(err) : resolve(res.body.hooms);
            });
    }.bind(this));
};

/**
 * Retrieve oEmbed data for a specific hoom
 *
 * @param hoomId
 * @returns Promise
 */
Hooms.prototype.getOembedByHoom = function(hoomId) {
    return when.promise(function(resolve, reject) {
        http.get(this.configuration.getBaseUrl() + '/hooms/' + hoomId + '/oembed')
            .accept('application/json')
            .end(function (err, res) {
                return err ? reject(err) : resolve(res.body);
            });
    }.bind(this));
};

module.exports = Hooms;
