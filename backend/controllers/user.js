var errors              = require('../validator').Errors,
    Configuration       = require('../config/configuration'),
    _                   = require('lodash'),
    when                = require('when')
    superagent          = require('superagent');

/**
 * Show the list of key(s) and their status
 *
 * GET  /:email
 */
var index = function(req, res, next) {

    var username = req.params.username;

    var agent = superagent.agent();

    agent
        .get('http://localhost:5001/users/?username=' + username)
        .end(function(error, response) {
            if (!error && response.ok) {

                if (_.has(response.body, 'users')) {
                    var users = response.body.users;
                    if (_.isArray(users) && users.length == 1) {
                        return res
                            .header("Content-Type", "text/html")
                            .render('html/user/show', {
                                user: users[0]
                            });
                    }
                }

                return res
                    .header("Content-Type", "text/html")
                    .render('html/user/not-found', {});

            } else {
                return res
                    .header("Content-Type", "text/html")
                    .render('html/error', {});
            }
        });
};

module.exports = {
    index : index
};
