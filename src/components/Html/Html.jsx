'use strict';

import React from 'react';
import Footer from '../Footer';

/**
 * React class to handle the rendering of the HTML head section
 *
 * @class Html
 * @constructor
 */
var Html = React.createClass({

    render() {
        var twitterScript = 'window.twttr = (function(d, s, id) {' +
            'var js, fjs = d.getElementsByTagName(s)[0],' +
            't = window.twttr || {};' +
            'if (d.getElementById(id)) return;' +
            'js = d.createElement(s);' +
            'js.id = id;' +
            'js.src = "https://platform.twitter.com/widgets.js";' +
            'fjs.parentNode.insertBefore(js, fjs);' +
            't._e = [];' +
            't.ready = function(f) {' +
            't._e.push(f);' +
            '};' +
            'return t;' +
            '}(document, "script", "twitter-wjs"));';
        return (
            <html className="no-js">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="/css/styles.css" />
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                    <Footer />
                    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                    <script src="/app.js"></script>
                    <script dangerouslySetInnerHTML={{__html: twitterScript}}></script>
                    <script src="//platform.instagram.com/en_US/embeds.js"></script>
                </body>
            </html>
        );
    }

});

module.exports = Html;
