/*
 *  _                    _
 * | |__    ___    ___  | |  ___
 * | '_ \  / _ \  / _ \ | | / _ \
 * | | | || (_) || (_) || ||  __/
 * |_| |_| \___/  \___/ |_| \___|
 *
 */

var console     = require('console'),
    app         = require('./backend/config/app');

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});