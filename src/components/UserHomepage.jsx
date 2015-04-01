'use strict';

var React               = require('react');
var classNames          = require('classnames');
var State               = require('react-router').State;
var UserHomepageStore   = require('../stores/UserHomepageStore');
var _                   = require('lodash');
var hoomleApi           = require('../config').hoomleApi;

/**
 * User profile section
 *
 * @class UserHomepage
 * @constructor
 */
var UserHomepage = React.createClass({

    mixins: [State],

    getInitialState: function() {
        return UserHomepageStore.getState();
    },

    componentDidMount: function() {
        UserHomepageStore.onChange(this._onStoreChange);
    },

    componentWillUnmount: function() {
        UserHomepageStore.off(this._onStoreChange);
    },

    _onStoreChange: function() {
        this.setState(UserHomepageStore.getState());
    },

    render: function() {

        console.log('RENDER USER_HOMEPAGE');
        console.log(this.state);

        var srcPhotoProfile = '/mock/profile.jpg';

        if (_.isEmpty(this.state.hooms)) {
            return (<div>NULL</div>);
        }

        if (_.has(this.state.hooms.homepage, 'photoProfile') && !_.isEmpty(this.state.hooms.homepage.photoProfile)) {
            srcPhotoProfile = this.state.hooms.homepage.photoProfile;
        }

        var headerStyle = {};
        var photo = <div className="avatarContainer"><img className="avatar" src={srcPhotoProfile} alt={this.state.hooms.user.displayName} /></div>;

        var classes = classNames({
            'Homepage': true,
            'coverAndPhoto': false,
            'onlyPhoto': true,
            'onlyCover': false
        });

        return (
            /* jshint ignore:start */
            <div className={classes}>
                <header style={headerStyle}>
                    <div className="content">
                        {photo}
                        <h1 className="displayName" dangerouslySetInnerHTML={{__html: this.state.hooms.user.displayName}} />
                        <p className="headline" dangerouslySetInnerHTML={{__html: this.state.hooms.homepage.bio}} />
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

module.exports = UserHomepage;
