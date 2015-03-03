'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var when = require('when');

module.exports = {

    load: function() {

        var homepage = {
            slug: 'stan',
            displayName: 'Stan Chollet',
            location: 'Paris & Orléans, France',
            headline: 'Passionate about travel, software development and sport. <br /> Software Developer at <a href="#">@MeeticFrance</a>',
            photos: {
                cover: 'http://localhost:5000/mock/cover.jpg',
                profile: 'http://localhost:5000/mock/profile.jpg'
            },
            // only-cover | cover-and-photo | only-photo
            // template: 'only-photo'
            template: 'only-photo'
            // template: 'only-cover'
        };

        Dispatcher.handleServerAction({
            actionType: ActionTypes.LOAD_HOMEPAGE_SUCCESS,
            homepage: homepage
        });

        return when.resolve();

        /*
        Dispatcher.handleServerAction({
            actionType: ActionTypes.LOAD_HOMEPAGE_ERROR,
            err: err
        });

        Dispatcher.handleViewAction({
            actionType: ActionTypes.LOAD_HOMEPAGE
        });
        */
    }

};
