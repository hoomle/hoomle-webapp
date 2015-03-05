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
var storeManager = require('./core/storeManager.js');
var homepageActions = require('./actions/homepageActions');
var appConfiguration = require('./config/appConfiguration');

var server = express();

server.use(express.static(path.join(__dirname)));
server.set('port', appConfiguration.getPort());

// Configure the namespace of "express-state"
server.set('state namespace', 'ReactCtx');
expressState.extend(server);

var routes = require('./core/routes');
var Router = require('react-router');
var Html = require('./components/Html');

server.use(function(req, res) {

    homepageActions.load().then(function() {
        Router.run(routes, req.url, function(Handler, state) {

            // Expose the context to the view
            res.expose(storeManager.dumpContext(), 'Stores');

            var html = React.createElement(Html, {
                state: res.locals.state.toString(),
                markup: React.renderToString(React.createElement(Handler, state))
            });

            res
                .status(200)
                .header('Content-Type', 'text/html')
                .send('<!DOCTYPE html>' + React.renderToStaticMarkup(html));
        });
    });
});

if (appConfiguration.isApiMockEnabled()) {
    require('./core/mockRoutes')(server);
}

server.listen(server.get('port'), function() {
    if (process.send) {
        process.send('online');
    } else {
        console.log('The server is running at http://localhost:' + server.get('port'));
    }
});
