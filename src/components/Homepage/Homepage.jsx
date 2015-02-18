'use strict';

import React from 'react/addons';
import HomepageStore from '../../stores/HomepageStore';
import Hooms from '../../components/Hooms';

var cx = React.addons.classSet;

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

    render() {
        var photo = null;
        var headerStyle = {};

        if (this.state.homepage.template === 'only-photo' || this.state.homepage.template === 'cover-and-photo') {
            photo = <img className="mainPhoto" src={this.state.homepage.photos.profile} alt={this.state.homepage.displayName} />;
        }

        if (this.state.homepage.template === 'only-cover' || this.state.homepage.template === 'cover-and-photo') {
            headerStyle = {
                backgroundImage: 'url(' + this.state.homepage.photos.cover + ')'
            };
        }

        var classes = cx({
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
                        <span className="location" dangerouslySetInnerHTML={{__html: this.state.homepage.location}} />
                    </div>
                    <div className="filter" />
                </header>
                <div className="headline" dangerouslySetInnerHTML={{__html: this.state.homepage.headline}} />
                <Hooms homepage={this.state.homepage.slug} />
            </div>
            /* jshint ignore:end */
        );
    }

});

module.exports = Homepage;
