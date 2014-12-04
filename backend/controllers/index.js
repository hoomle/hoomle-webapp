var defaultCtrl                 = require('./default'),
    userCtrl                    = require('./user'),
    instagramAuthCtrl           = require('./auth/instagram'),
    instagramRegistrationCtrl   = require('./registration/instagram');
    handleRegistrationCtrl      = require('./registration/handle')
    defaultRegistrationCtrl     = require('./registration/default');

module.exports = {
    Default: defaultCtrl,
    User: userCtrl,
    Auth: {
        Instagram: instagramAuthCtrl
    },
    Registration: {
        Default: defaultRegistrationCtrl,
        Handle: handleRegistrationCtrl,
        Instagram: instagramRegistrationCtrl
    }
};