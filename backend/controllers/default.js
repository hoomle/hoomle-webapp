var _ = require('lodash');

/**
 * Homepage
 *
 * GET  /
 *
 * @param {Request}     req
 * @param {Response}    res
 * @param {function}    next
 */
var landing = function(req, res, next) {

    return res
        .status(200)
        .header("Content-Type", "text/html")
        .render('html/landing');
};

/**
 * Error handler
 *
 * @param {Request}     req
 * @param {Response}    res
 * @param {function}    next
 */
var errorHandler = function(err, req, res, next) {
    var error = {};
    error.message = _.isString(err) ? err : (_.isObject(err) ? err.message : 'Unknown Error');
    
    if (_.has(err, 'code')) {
        error.code = err.code;
    }
    return res
        .status(err.status || 500)
        .header("Content-Type", "text/html")
        .render('html/error', {
            error: error
        });
};

module.exports = {
    landing      : landing,
    errorHandler : errorHandler
};