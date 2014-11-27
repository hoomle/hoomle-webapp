var errors              = require('../validator').Errors,
    Configuration       = require('../config/configuration'),
    _                   = require('lodash'),
    when                = require('when');

/**
 * Show the list of key(s) and their status
 *
 * GET  /:email
 */
var index = function(req, res, next) {

    var username = req.params.username;

    return res
        .header("Content-Type", "text/html")
        .render('html/user', { });

};

module.exports = {
    index : index
};
