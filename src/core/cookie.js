'use strict';

var objectAssign = require('object-assign');
var _ = require('lodash');
var ExecutionEnvironment = require('./ExecutionEnvironment');

/**
 * Helper to work with cookie on isomorphic apps
 *
 * Server side:
 *
 * Use the API of Express Response Cookie (http://expressjs.com/api.html#res.cookie)
 * res.clearCookie(name [, options])
 * res.cookie(name, value [, options])
 *      Options:
 *          domain	String	Domain name for the cookie. Defaults to the domain name of the app.
 *          expires	Date	Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
 *          httpOnly	Boolean	Flags the cookie to be accessible only by the web server.
 *          maxAge	String	Convenient option for setting the expiry time relative to the current time in milliseconds.
 *          path	String	Path for the cookie. Defaults to “/”.
 *          secure	Boolean	Marks the cookie to be used with HTTPS only.
 *          signed	Boolean	Indicates if the cookie should be signed.
 *
 * Client side:
 *
 * Based on the module cookies-js
 * Cookies.set(key, value [, options])
 * Cookies.get(key)
 * Cookies.expire(key [, options])
 *      Options:
 *          path	A string value of the path of the cookie (default "/")
 *          domain	A string value of the domain of the cookie
 *          expires	A number (of seconds), a date parsable string, or a Date object of when the cookie will expire
 *          secure	A boolean value of whether or not the cookie should only be available over SSL (default false)
 */

var _res;
var _req;
var _reqCookies;
var _default = {
    path: '/',
    isJson: false
};

var _isClientSide = ExecutionEnvironment.canUseDOM;
var _clientCookie;

if (_isClientSide) {
    _clientCookie = require('cookies-js');
}

var get = function(key, options) {
    options = objectAssign(_default, options);
    var value;

    if (_isClientSide) {
        value = _clientCookie.get(key);
    } else {
        value = _.has(_reqCookies, key) ? _reqCookies[key] : null;
    }

    return options.isJson ? JSON.parse(value) : value;
};

var set = function(key, value, options) {
    options = objectAssign(_default, options);

    if (options.isJson) {
        value = JSON.stringify(value);
    }

    if (_isClientSide) {
        _clientCookie.set(key, value, options);
    } else {
        _reqCookies[key] = value;
        _res.cookie(key, value, options);
    }
};

var expire = function(key, options) {
    options = objectAssign(_default, options);

    if (_isClientSide) {
        _clientCookie.expire(key, options);
    } else {
        _res.clearCookie(key, options);
        if (_.has(_reqCookies, key)) {
            _reqCookies[key] = null;
        }
    }
};

var expressMiddleware = function(req, res, next) {
    _res = res;
    _req = req;

    // Clone req.cookies
    if (_req.cookies) {
        _reqCookies = JSON.parse(JSON.stringify(req.cookies));
    }

    next();
};

module.exports = {
    get: get,
    set: set,
    expire: expire,
    expressMiddleware: expressMiddleware
};