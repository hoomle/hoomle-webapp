var morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    express             = require('express'),
    session             = require('express-session'),
    Configuration       = require('../config/configuration'),
    controllers         = require('../controllers'),
    app                 = express();

app.set('port', Configuration.port);
app.use(morgan(Configuration.env));
app.use(bodyParser());
app.use(methodOverride());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.engine('ejs', require('ejs').__express);
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
app.use(express.static('build'));

app.get('/auth/instagram', controllers.Auth.Instagram.auth);
app.get('/auth/instagram/callback', controllers.Auth.Instagram.callback);

app.get('/registration/instagram', controllers.Registration.Instagram.index);
app.get('/registration', controllers.Registration.Default.index);
app.post('/registration', controllers.Registration.Handle.index);

app.route('/:username').get(controllers.User.index);
app.route('/').get(controllers.Default.landing);

// Handle error(s)
app.use(controllers.Default.errorHandler);

module.exports = app;