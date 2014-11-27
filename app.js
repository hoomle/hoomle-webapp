var console     = require('console'),
    app         = require('./server/config/app');

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});