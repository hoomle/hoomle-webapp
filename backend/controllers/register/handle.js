var errors              = require('../../validator/index').Errors,
    Configuration       = require('../../config/configuration'),
    _                   = require('lodash'),
    when                = require('when')
    superagent          = require('superagent');

var index = function(req, res, next) {

    console.info('POST /registration handle request');

    return res
        .header("Content-Type", "text/html")
        .render('html/error', {

        });
};

module.exports = {
    index: index
};
