'use strict';

require('6to5/polyfill');

var React = require('react');
var emptyFunction = require('react/lib/emptyFunction');
var Profile = require('./components/Profile');
var Dispatcher = require('./core/Dispatcher');
var AppActions = require('./actions/AppActions');
var ActionTypes = require('./constants/ActionTypes');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

function run() {
  // Render the top-level React component
  var props = {
      displayName: 'stan'
  };
  var component = React.createElement(Profile, props);
  var profile = React.render(component, document.getElementById('root'));
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
