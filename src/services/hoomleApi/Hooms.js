'use strict';

import http from 'superagent';
import when from 'when';

class Hooms {

    /**
     * Constructor
     * @param configuration
     */
    constructor(configuration) {
        this.configuration = configuration;
    }

    /**
     * Retrieve hooms by its homepage slug
     *
     * @param homepageSlug
     * @returns Promise
     */
    getByHomepageSlug(homepageSlug) {
        return when.promise(function(resolve, reject) {
            http.get(this.configuration.getBaseUrl() + '/homepage/' + homepageSlug + '/hooms')
                .accept('application/json')
                .end(function (err, res) {
                    return err ? reject(err) : resolve(res.body.hooms);
                });
        }.bind(this));
    }

    /**
     * Retrieve oEmbed data for a specific hoom
     *
     * @param hoomId
     * @returns Promise
     */
    getOembedByHoom(hoomId) {
        return when.promise(function(resolve, reject) {
            http.get(this.configuration.getBaseUrl() + '/hooms/' + hoomId + '/oembed')
                .accept('application/json')
                .end(function (err, res) {
                    return err ? reject(err) : resolve(res.body);
                });
        }.bind(this));
    }
}

module.exports = Hooms;
