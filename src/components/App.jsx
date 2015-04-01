'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

/**
 * React class to handle the rendering of the App section
 *
 * @class App
 * @constructor
 */
var App = React.createClass({

    render: function() {
        return (
            <div>
                <header>
                    <ul>
                        <li><Link to="homepage">Homepage</Link></li>
                        <li><Link to="registration">Signin</Link></li>
                        <li><Link to="login">Login</Link></li>
                        <li><a href="/chuck">go to chuck page</a></li>
                    </ul>
                </header>
                <RouteHandler {...this.props} />
            </div>
        );
    }

});

module.exports = App;
