'use strict';

import React from 'react';
import Profile from './Profile';
import Html from './Html';

module.exports = {
    ProfileComponent: React.createFactory(Profile),
    HtmlComponent: React.createFactory(Html)
};