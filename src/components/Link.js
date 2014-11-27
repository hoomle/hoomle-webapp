'use strict';

var React = require('react');
var RouteActions = require('../actions/RouteActions');

var Link = React.createClass({
  propTypes: {
    to: React.PropTypes.string.isRequired
  },
  render: function() {
    this.props.href =
      this.props.to && this.props.to.lastIndexOf('/', 0) === 0 ?
      this.props.to : '/' + this.props.to;

    return <a onClick={this.handleClick} {...this.props}>{this.props.children}</a>;
  },
  handleClick: function(e) {
    e.preventDefault();
    RouteActions.setRoute(this.props.to);
  }
});

module.exports = Link;
