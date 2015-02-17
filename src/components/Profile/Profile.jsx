'use strict';

import React from 'react/addons';
import ProfileStore from '../../stores/ProfileStore';

var cx = React.addons.classSet;

/**
 * Profile section
 *
 * @class Profile
 * @constructor
 */
var Profile = React.createClass({

    getInitialState: function() {
        return ProfileStore.getState();
    },

    componentDidMount: function() {
        ProfileStore.onChange(this._onStoreChange);
    },

    componentWillUnmount: function() {
        ProfileStore.off(this._onStoreChange);
    },

    _onStoreChange: function() {
        this.setState(ProfileStore.getState());
    },

    render() {
        var photo = null;
        var headerStyle = {};

        if (this.state.user.template === 'only-photo' || this.state.user.template === 'cover-and-photo') {
            photo = <img className="mainPhoto" src={this.state.user.photos.profile} alt={this.state.user.displayName} />;
        }

        if (this.state.user.template === 'only-cover' || this.state.user.template === 'cover-and-photo') {
            headerStyle = {
                backgroundImage: 'url(' + this.state.user.photos.cover + ')'
            };
        }

        var classes = cx({
            'Profile': true,
            'coverAndPhoto': this.state.user.template === 'cover-and-photo',
            'onlyPhoto': this.state.user.template === 'only-photo',
            'onlyCover': this.state.user.template === 'only-cover'
        });

        return (
            /* jshint ignore:start */
            <div className={classes}>
                <header style={headerStyle}>
                    <div className="content">
                        {photo}
                        <h1 className="displayName" dangerouslySetInnerHTML={{__html: this.state.user.displayName}} />
                        <span className="location" dangerouslySetInnerHTML={{__html: this.state.user.location}} />
                    </div>
                    <div className="filter" />
                </header>
                <div className="headline" dangerouslySetInnerHTML={{__html: this.state.user.headline}} />
            </div>
            /* jshint ignore:end */
        );
    }

});

module.exports = Profile;
