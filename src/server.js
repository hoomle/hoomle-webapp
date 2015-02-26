'use strict';

/*
 *  _                           _
 * | |                         | |
 * | |__   ___   ___  _ __ ___ | | ___
 * | '_ \ / _ \ / _ \| '_ ` _ \| |/ _ \
 * | | | | (_) | (_) | | | | | | |  __/
 * |_| |_|\___/ \___/|_| |_| |_|_|\___|
 *
 *                                      (_)    _
 *  ___  ___ _ ____   _____ _ __     ___ _  __| | ___
 * / __|/ _ \ '__\ \ / / _ \ '__|   / __| |/ _` |/ _ \
 * \__ \  __/ |   \ V /  __/ |      \__ \ | (_| |  __/
 * |___/\___|_|    \_/ \___|_|      |___/_|\__,_|\___|
 *
 */

var path = require('path');
var express = require('express');
var expressState = require('express-state');
var components = require('./components');
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

server.get('/', function(req, res) {
    homepageActions.load('stan').then(function() {
            // Expose the context to the view
            res.expose(storeManager.dumpContext(), 'Stores');

            var html = React.renderToStaticMarkup(new components.HtmlComponent({
                state: res.locals.state.toString(),
                markup: React.renderToString(new components.HomepageComponent())
            }));

            res
                .status(200)
                .header('Content-Type', 'text/html')
                .send(html);
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
