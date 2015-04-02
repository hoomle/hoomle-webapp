'use strict';

var _ = require('lodash');

var getAuthorizationHeader = function(token) {
    if (_.isObject(token)) {
        return _.capitalize(token.token_type) + ' ' + token.access_token;
    } else {
        return '';
    }
};

module.exports = {
    getAuthorizationHeader: getAuthorizationHeader
};