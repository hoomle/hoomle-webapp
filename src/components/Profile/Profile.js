'use strict';

// require('./Profile.less');

import React from 'react';
import ProfileStore from '../../stores/ProfileStore';

var Profile = React.createClass({

    getInitialState: function() {
        console.log('initiale State of Profile');
        console.log(JSON.stringify(ProfileStore.getState()));
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

        console.log('render()');
        console.log(JSON.stringify(this.state));
        console.log('display name' + this.state.user.displayName);

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
