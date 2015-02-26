'use strict';

var React = require('react');

/**
 * React class to handle the rendering of the Footer section
 *
 * @class Footer
 * @constructor
 */
var Footer = React.createClass({

    render: function() {
        return (
            <div className="Footer">
                <ul>
                    <li>© 2015 Hoomle</li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Privacy</a></li>
                </ul>
            </div>
        );
    }

});

module.exports = Footer;
