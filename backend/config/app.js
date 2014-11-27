var morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    express             = require('express'),
    Configuration       = require('../config/configuration'),
    controllers         = require('../controllers'),
    app                 = express();

app.set('port', Configuration.port);
app.use(morgan(Configuration.env));
app.use(bodyParser());
app.use(methodOverride());

// Templating with EJS
app.engine('ejs', require('ejs').__express);
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
app.use(express.static('build'));

app.route('/:username').get(controllers.User.index);
app.route('/').get(controllers.Default.landing);

// Handle error(s)
app.use(controllers.Default.errorHandler);

module.exports = app;