'use strict';

var React = require('react');

// var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin

// injectTapEventPlugin();

var mui = require('material-ui');
var Boxes = require('./components/Boxes');

React.render(
    <Boxes />,
    document.getElementById('boxes')
);

React.render(
    <mui.Input type="text" name="firstname" placeholder="First Name" description="Your first name as it appears on your credit card." />,
    document.getElementById('form-react')
);