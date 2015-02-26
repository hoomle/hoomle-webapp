'use strict';

var React = require('react');

module.exports = {
    FooterComponent         : React.createFactory(require('./Footer')),
    InstagramHoomComponent  : React.createFactory(require('./InstagramHoom')),
    HomepageComponent       : React.createFactory(require('./Homepage')),
    HoomsComponent          : React.createFactory(require('./Hooms')),
    HtmlComponent           : React.createFactory(require('./Html')),
    RssHoomComponent        : React.createFactory(require('./RssHoom')),
    TwitterHoomComponent    : React.createFactory(require('./TwitterHoom'))
};