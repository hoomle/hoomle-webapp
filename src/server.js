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

import path from 'path';
import express from 'express';
import expressState from 'express-state';
import components from './components';
import React from 'react';
import storeManager from './core/storeManager.js';
import profileActions from './actions/profileActions.js';

// Set global variables
global.__DEV__ = process.env.NODE_ENV === 'development';
global.__SERVER__ = true;

var server = express();

server.use(express.static(path.join(__dirname)));
server.set('port', (process.env.PORT || 5000));

// The template EJS is currently disabled for the benetif of React
// server.engine('ejs', require('ejs').__express);
// server.set('views', __dirname + '/../src/views');
// server.set('view engine', 'ejs');

server.set('state namespace', 'ReactCtx');
expressState.extend(server);

server.get('/stan', function(req, res) {
    profileActions.loadProfile('stan', function() {

        res.expose(storeManager.dumpContext(), 'Stores');

        var html = React.renderToStaticMarkup(new components.HtmlComponent({
            state: res.locals.state.toString(),
            markup: React.renderToString(new components.ProfileComponent())
        }));

        res
            .status(200)
            .header('Content-Type', 'text/html')
            .send(html);
    });
});

// Mock API
server.get('/api/v1/users/stan', function(req, res) {
    res
        .contentType('application/json')
        .send({
            displayName: 'Stan Chollet'
        });
});

server.listen(server.get('port'), function() {
    if (process.send) {
        process.send('online');
    } else {
        console.log('The server is running at http://localhost:' + server.get('port'));
    }
});
