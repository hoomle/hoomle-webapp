var errors              = require('../../validator/index').Errors,
    Configuration       = require('../../config/configuration'),
    _                   = require('lodash'),
    when                = require('when')
    superagent          = require('superagent');

var IG_CLIENT_ID = 'bbea8bf74fa945ef93e0ba66abb07eac';
var IG_CLIENT_SECRET = '0fefb7ab5e634a9c80c6792d3c69bd90';
var IG_CALLBACK_URL = 'http://localhost:5000/auth/instagram/callback';

var auth = function(req, res, next) {

    res.redirect('https://api.instagram.com/oauth/authorize/?client_id='
        + IG_CLIENT_ID
        + '&redirect_uri='
        + encodeURIComponent(IG_CALLBACK_URL)
        + '&response_type=code');
};

var callback = function(req, res, next) {

    console.info('callback: 1');
    console.info('workflow: ' + req.query.workflow);

    // First step of authentication
    // f.e: /auth/instagram/callback?code=7fcda80f2bfc4dd4a2fdd51690c76f55
    if (_.has(req.query, 'code') && !_.isEmpty(req.query.code)) {

        console.info('callback: 2 ' + JSON.stringify(req.query));

        var agent = superagent.agent();

        agent
            .post('https://api.instagram.com/oauth/access_token')
            .type('form')
            .send({
                grant_type: 'authorization_code',
                client_id: IG_CLIENT_ID,
                client_secret: IG_CLIENT_SECRET,
                redirect_uri: IG_CALLBACK_URL,
                code: req.query.code
            })
            .end(function(error, response) {

                console.info("status: " + response.status);
                console.info("body: " + JSON.stringify(response.body));

                if (!error && response.ok) {

                    var profile = response.body;

                    if (_.has(profile, 'access_token') && _.has(profile, 'user') && _.has(profile.user, 'id')) {

                        // TODO
                        // #1 Check into the database if user exist with these instagram id
                        // IF (user exist) THEN
                        //     Update the credentials (access_token)
                        //     Log the user on the website
                        //     Redirect the user to its homepage
                        // ELSE IF (user is connected) THEN
                        //     Link the current user to this Instagram profile
                        // ELSE
                        //     Prepare data
                        //     Redirect the user to the registraion instagram workflow

                        req.session.registration_instragram = {
                            user: profile.user,
                            access_token: profile.access_token
                        };

                        console.info('callback: request token ok');

                        return res.redirect('/registration/instagram');
                    }
                }

                // TODO
                // IF (user is connected) THEN
                //    Redirect the user to its settings
                // ELSE
                //    IF (Instagram error) THEN
                //        Redirect the user to the default registration page
                //        Show message "you refuse the instagram login
                //    ELSE
                //        Show message "instagram are not reacheable at this moment, try later"

                console.info('callback: request token failed');
                console.info(JSON.stringify(error));

                return res
                    .header("Content-Type", "text/html")
                    .render('html/error', {});
            });
    }

    if (_.has(req.query, 'error') && _.has(req.query, 'error_reason')
            && req.query.error == 'access_denied' && req.query.error == 'user_denied') {

        console.info('callback: error user denie');

        // TODO manage error
        // http://your-redirect-uri?error=access_denied&error_reason=user_denied&error_description=The+user+denied+your+request
        // Check is the quotat are reached
    }

    // TODO
    // Instagram are not reacheable, please try later
};

module.exports = {
    auth: auth,
    callback: callback
};
