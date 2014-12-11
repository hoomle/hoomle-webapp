var errors              = require('../../validator/index').Errors,
    Configuration       = require('../../config/configuration'),
    _                   = require('lodash'),
    when                = require('when')
    superagent          = require('superagent');

var index = function(req, res, next) {

    console.info('GET /registration default regform');

    return res
        .header("Content-Type", "text/html")
        .render('html/registration/default', {
            
        });
};

module.exports = {
    index: index
};
