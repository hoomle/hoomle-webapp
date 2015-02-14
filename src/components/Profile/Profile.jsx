'use strict';

import './Profile.less';
import React from 'react';
import ProfileStore from '../../stores/ProfileStore';

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
        return (
            /* jshint ignore:start */
            <header className="Profile">
                <h1 dangerouslySetInnerHTML={{__html: this.state.user.displayName}} />
                <span className="location">Orleans, France</span>
                <div className="headline">Passionate about travel, software development and sport.
                    <br />
                    Software Developer at @MeeticFrance</div>
            </header>
            /* jshint ignore:end */
        );
    }

});

module.exports = Profile;
