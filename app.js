var console     = require('console'),
    app         = require('./backend/config/app');

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});