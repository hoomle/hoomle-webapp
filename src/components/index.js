'use strict';

import React from 'react';
import Footer from './Footer';
import InstagramHoom from './InstagramHoom';
import Homepage from './Homepage';
import Hooms from './Hooms';
import Html from './Html';
import RssHoom from './RssHoom';
import TwitterHoom from './TwitterHoom';

module.exports = {
    FooterComponent         : React.createFactory(Footer),
    InstagramHoomComponent  : React.createFactory(InstagramHoom),
    HomepageComponent       : React.createFactory(Homepage),
    HoomsComponent          : React.createFactory(Hooms),
    HtmlComponent           : React.createFactory(Html),
    RssHoomComponent        : React.createFactory(RssHoom),
    TwitterHoomComponent    : React.createFactory(TwitterHoom)
};