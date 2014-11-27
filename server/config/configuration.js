/**
 * Application configuration object
 *
 * @constructor
 */
function Configuration() {
    this.env            = process.env.HOOLE_WEB_APP_ENV || 'dev';
    this.port           = process.env.HOOLE_WEB_APP_PORT || 5000;
    this.host           = process.env.HOOLE_WEB_APP_HOST || "localhost";
    this.encoding       = process.env.HOOLE_WEB_APP_ENCODING || 'utf8';
}

/**
 * Get root URL of application
 */
Configuration.prototype.getRootUrl = function() {
    var url = 'http://' + this.host;
    url += (80 !== this.port) ? ':' + this.port : '';
    return url;
};

module.exports = new Configuration();