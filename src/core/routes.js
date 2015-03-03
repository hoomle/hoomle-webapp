var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('../components/App');
var Homepage = require('../components/Homepage');
var Registration = require('../components/Registration');
var NotFound = require('../components/NotFound');

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute name="homepage" handler={Homepage} />
        <Route name="registration" path="/registration" handler={Registration} />
        <NotFoundRoute name="404" handler={NotFound} />
    </Route>
);

module.exports = routes;