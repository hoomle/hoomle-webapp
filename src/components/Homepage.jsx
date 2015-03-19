'use strict';

var React           = require('react');
var classNames      = require('classnames');
var HomepageStore   = require('../stores/HomepageStore');

/**
 * Homepage section
 *
 * @class Homepage
 * @constructor
 */
var Homepage = React.createClass({

    getInitialState: function() {
        return HomepageStore.getState();
    },

    componentDidMount: function() {
        HomepageStore.onChange(this._onStoreChange);
    },

    componentWillUnmount: function() {
        HomepageStore.off(this._onStoreChange);
    },

    _onStoreChange: function() {
        this.setState(HomepageStore.getState());
    },

    render: function() {
        var photo = null;
        var headerStyle = {};

        if (this.state.homepage.template === 'only-photo' || this.state.homepage.template === 'cover-and-photo') {
            photo = <div className="avatarContainer"><img className="avatar" src={this.state.homepage.photos.profile} alt={this.state.homepage.displayName} /></div>;
        }

        if (this.state.homepage.template === 'only-cover' || this.state.homepage.template === 'cover-and-photo') {
            headerStyle = {
                backgroundImage: 'url(' + this.state.homepage.photos.cover + ')'
            };
        }

        var classes = classNames({
            'Homepage': true,
            'coverAndPhoto': this.state.homepage.template === 'cover-and-photo',
            'onlyPhoto': this.state.homepage.template === 'only-photo',
            'onlyCover': this.state.homepage.template === 'only-cover'
        });

        return (
            /* jshint ignore:start */
            <div className={classes}>
                <header style={headerStyle}>
                    <div className="content">
                        {photo}
                        <h1 className="displayName" dangerouslySetInnerHTML={{__html: this.state.homepage.displayName}} />
                        <p className="headline" dangerouslySetInnerHTML={{__html: this.state.homepage.headline}} />
                    </div>
                </header>
                <ul className="networks">
                    <li>
                        <a href="#">
                            <img src="/images/twitter.svg" alt="twitter"/>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/images/facebook.svg" alt="facebook" />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/images/github.svg" alt="github" />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/images/linkedin.svg" alt="LinkedIn" />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/images/meetup.svg" alt="Meetup" />
                        </a>
                    </li>
                </ul>
            </div>
            /* jshint ignore:end */
        );
    }

});

module.exports = Homepage;
