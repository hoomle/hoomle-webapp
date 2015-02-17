'use strict';

import React from 'react';
import Homepage from './Homepage';
import Html from './Html';

module.exports = {
    HomepageComponent: React.createFactory(Homepage),
    HtmlComponent: React.createFactory(Html)
};