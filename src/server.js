'use strict';

/*
 *  _                           _
 * | |                         | |
 * | |__   ___   ___  _ __ ___ | | ___
 * | '_ \ / _ \ / _ \| '_ ` _ \| |/ _ \
 * | | | | (_) | (_) | | | | | | |  __/
 * |_| |_|\___/ \___/|_| |_| |_|_|\___|
 *
 */

var path = require('path');
var express = require('express');
var expressState = require('express-state');
var React = require('react/addons');
// var storeManager = require('./core/storeManager.js');
var UserHomepageActions = require('./actions/UserHomepageActions');
var SessionActions = require('./actions/SessionActions');
var appConfiguration = require('./config/appConfiguration');
var cookieParser = require('cookie-parser');
var cookie = require('./core/cookie');
var morgan = require('morgan');
var fluxIsomorphicHelpers = require('flux-isomorphic-helpers');

var server = express();

server.use(morgan('dev'));
server.use(cookieParser());
server.use(cookie.expressMiddleware);
server.use(express.static(path.join(__dirname)));
server.set('port', appConfiguration.getPort());

// Configure the namespace of "express-state"
server.set('state namespace', 'ReactCtx');
expressState.extend(server);

var routes = require('./core/routes');
var Router = require('react-router');
var Html = require('./components/Html');

var renderView = function(req, res) {
    Router.run(routes, req.url, function(Handler, state) {

        var UserHomepageStore = require('./stores/UserHomepageStore');
        var SessionStore = require('./stores/SessionStore');

        var storeManager = new fluxIsomorphicHelpers.StoreManager();
        storeManager.add(UserHomepageStore);
        storeManager.add(SessionStore);

        // Expose the context to the view
        res.expose(storeManager.dumpContext(), 'Stores');

        console.log('Handler (SERVER): ');

        var html = React.createElement(Html, {
            state: res.locals.state.toString(),
            markup: React.renderToString(React.createElement(Handler, state.params))
        });

        res
            .status(200)
            .header('Content-Type', 'text/html')
            .send('<!DOCTYPE html>' + React.renderToStaticMarkup(html));
    });
};

server.route('/').get(function(req, res) {
    console.log('SERVER VIEW /');

    SessionActions.load()
        .then(function() {
            renderView(req, res);
        }, function() {
            renderView(req, res);
        });
});

server.route('/:slug').get(function(req, res, next) {
    console.log('SERVER VIEW /:slug');

    SessionActions.load()
        .then(function() {
            return UserHomepageActions.load(req.params.slug);
        }, function() {
            return UserHomepageActions.load(req.params.slug);
        })
        .then(function() {
            renderView(req, res);
        }, function() {
            next();
        });
});

// Fallback
server.use(function(req, res) {
    console.log('SERVER VIEW Fallback');

    SessionActions.load()
        .then(function() {
            renderView(req, res);
        }, function() {
            renderView(req, res);
        });
});

server.listen(server.get('port'), function() {
    if (process.send) {
        process.send('online');
    } else {
        console.log('The server is running at http://localhost:' + server.get('port'));
    }
});
