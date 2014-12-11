var errors              = require('../../validator/index').Errors,
    Configuration       = require('../../config/configuration'),
    _                   = require('lodash'),
    when                = require('when'),
    superagent          = require('superagent');

var index = function(req, res, next) {

    console.info('instagram registration: ' + JSON.stringify(req.session.registration_instragram));

    return res
        .header("Content-Type", "text/html")
        .render('html/registration/instagram', {
            photoUrl: req.session.registration_instragram.user.profile_picture,
            username: req.session.registration_instragram.user.username,
            displayName: req.session.registration_instragram.user.full_name,
            bio: req.session.registration_instragram.user.bio
        });
};

module.exports = {
    index: index
};
