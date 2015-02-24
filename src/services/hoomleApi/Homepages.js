'use strict';

import http from 'superagent';
import when from 'when';

class Homepages {

    /**
     * Constructor
     * @param configuration
     */
    constructor(configuration) {
        this.configuration = configuration;
    }

    /**
     * Retrieve homepage by its slug
     *
     * @param slug
     * @returns Promise
     */
    getBySlug(slug) {
        return when.promise(function(resolve, reject) {
            http.get(this.configuration.getBaseUrl() + '/homepage/' + slug)
                .accept('application/json')
                .end(function (err, res) {
                    return err ? reject(err) : resolve(res.body);
                });
        }.bind(this));
    }
}

module.exports = Homepages;
