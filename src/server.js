'use strict';

var _ = require('lodash');
var path = require('path');
var express = require('express');
var React = require('react');

// Set global variables
global.__DEV__ = process.env.NODE_ENV == 'development';
global.__SERVER__ = true;

var Profile = React.createFactory(require('./components/Profile'));
var Dispatcher = require('./core/Dispatcher');
var ActionTypes = require('./constants/ActionTypes');
var AppStore = require('./stores/AppStore');

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
