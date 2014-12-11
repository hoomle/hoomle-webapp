var defaultCtrl                 = require('./default'),
    userCtrl                    = require('./user'),
    instagramAuthCtrl           = require('./auth/instagram'),
    instagramRegisterCtrl       = require('./register/instagram'),
    handleRegisterCtrl          = require('./register/handle'),
    defaultRegisterCtrl         = require('./register/default');

module.exports = {
    default: defaultCtrl,
    user: userCtrl,
    auth: {
        instagram: instagramAuthCtrl
    },
    register: {
        default: defaultRegisterCtrl,
        handle: handleRegisterCtrl,
        instagram: instagramRegisterCtrl
    }
};