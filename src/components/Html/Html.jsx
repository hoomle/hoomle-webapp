'use strict';

import React from 'react';

/**
 * React class to handle the rendering of the HTML head section
 *
 * @class Html
 * @constructor
 */
var Html = React.createClass({

    render() {
        return (
            <html className="no-js">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="/css/bootstrap.css" />
                    <link rel="stylesheet" href="/css/Homepage/Homepage.css" />
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                    <script src="/app.js"></script>
                </body>
            </html>
        );
    }

});

module.exports = Html;
