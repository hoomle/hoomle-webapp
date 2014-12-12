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

app.get('/auth/instagram',              controllers.auth.instagram.auth);
app.get('/auth/instagram/callback',     controllers.auth.instagram.callback);

app.get('/register/instagram',          controllers.register.instagram.index);
app.get('/register',                    controllers.register.default.index);
app.post('/register',                   controllers.register.handle.index);

app.get('/:username',                   controllers.user.index);
app.get('/',                            controllers.default.landing);

// Handle error(s)
app.use(controllers.default.errorHandler);

module.exports = app;