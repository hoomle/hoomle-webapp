var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('../components/App');
var Homepage = require('../components/Homepage');
var Registration = require('../components/Registration');
var Login = require('../components/Login');
var UserHomepage = require('../components/UserHomepage');
var NotFound = require('../components/NotFound');

var routes = (
    <Route name="homepage" path="/" handler={App}>
        <Route name="registration" path="registration" handler={Registration} />
        <Route name="login" path="login" handler={Login} />
        <Route name="userHomepage" path=":slug" handler={UserHomepage} />
        <NotFoundRoute name="404" handler={NotFound} />
        <DefaultRoute handler={Homepage} />
    </Route>
);

module.exports = routes;