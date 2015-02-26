'use strict';

var http = require('superagent');
var when = require('when');

/**
 * Constructor
 * @param configuration
 */
function Homepages(configuration) {
    this.configuration = configuration;
}

/**
 * Retrieve homepage by its slug
 *
 * @param slug
 * @returns Promise
 */
Homepages.prototype.getBySlug = function(slug) {
    return when.promise(function(resolve, reject) {
        http.get(this.configuration.getBaseUrl() + '/homepage/' + slug)
            .accept('application/json')
            .end(function (err, res) {
                return err ? reject(err) : resolve(res.body);
            });
    }.bind(this));
};

module.exports = Homepages;
