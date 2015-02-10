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

import _ from 'lodash';
import path from 'path';
import express from 'express';
import React from 'react';
import ProfileComponent from './components/Profile';
import Dispatcher from './core/Dispatcher';
import ActionTypes from './constants/ActionTypes';
import AppStore from './stores/AppStore';

// Set global variables
global.__DEV__ = process.env.NODE_ENV == 'development';
global.__SERVER__ = true;

var Profile = React.createFactory(ProfileComponent);
var server = express();

server.set('port', (process.env.PORT || 5000));
server.engine('ejs', require('ejs').__express);
server.set('views', __dirname + '/../src/views');
server.set('view engine', 'ejs');
server.use(express.static(path.join(__dirname)));

server.get('/stan', function(req, res) {

    var profile = new Profile({
        displayName: 'stan'
    });
    var data = {};
    data.body = React.renderToString(profile);
    return res
        .status(200)
        .header("Content-Type", "text/html")
        .render('index', data);
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
  console.log('The server is running at http://localhost:' + server.get('port'));
});

module.exports.server = server;
