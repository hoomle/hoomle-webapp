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

require('babel/polyfill');
var React = require('react');
var storeManager = require('./core/storeManager.js');
var routes = require('./core/routes');
var Router = require('react-router');

function run() {
    // Load the data build on the server
    storeManager.loadContext(window.ReactCtx.Stores);
    Router.run(routes, Router.HistoryLocation, function(Handler, state) {
        console.log('Handler (FRONT): ');
        React.render(<Handler {...state.params} />, document.getElementById('app'));
    });
}

// Run the application when both DOM is ready
// and page content is loaded
Promise.all([
    new Promise((resolve) => {
        if (window.addEventListener) {
            window.addEventListener('DOMContentLoaded', resolve);
        } else {
            window.attachEvent('onload', resolve);
        }
    })
]).then(run);