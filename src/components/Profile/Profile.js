'use strict';

require('./Profile.less');

var React = require('react');
var request = require('superagent');

var Profile = React.createClass({

    propTypes: {
        displayName: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            displayName: this.props.displayName
        };
    },

    componentDidMount() {
        request.get('http://localhost:5000/api/v1/users/stan', function(response) {
            if (this.isMounted()) {
                this.setState({
                    displayName: response.body.displayName
                });
            }
        }.bind(this));
    },

    render() {
        return (
            /* jshint ignore:start */
            <header className="Profile">
                <h1 dangerouslySetInnerHTML={{__html: this.state.displayName}} />
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
