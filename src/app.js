'use strict';

/*
 *  _                           _
 * | |                         | |
 * | |__   ___   ___  _ __ ___ | | ___
 * | '_ \ / _ \ / _ \| '_ ` _ \| |/ _ \
 * | | | | (_) | (_) | | | | | | |  __/
 * |_| |_|\___/ \___/|_| |_| |_|_|\___|
 *
 *   __                 _           _     _
 *  / _|               | |         (_)   | |
 * | |_ _ __ ___  _ __ | |_     ___ _  __| | ___
 * |  _| '__/ _ \| '_ \| __|   / __| |/ _` |/ _ \
 * | | | | | (_) | | | | |_    \__ \ | (_| |  __/
 * |_| |_|  \___/|_| |_|\__|   |___/_|\__,_|\___|
 *
 */

import '6to5/polyfill';
import React from 'react';
import components from './components';
import storeManager from './core/storeManager.js';

function run() {
    storeManager.loadContext(window.ReactCtx.Stores);
    React.render(
        new components.HomepageComponent(),
        document.getElementById('app')
    );
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