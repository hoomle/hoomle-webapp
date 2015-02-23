'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import http from 'superagent';
import when from 'when';

module.exports = {

    load(homepageSlug, cb) {
        console.log('hoomAction:load(' + homepageSlug + ')');
        Dispatcher.handleViewAction({
            actionType: ActionTypes.LOAD_HOOMS,
            homepageSlug: homepageSlug
        });

        // TODO Refactor with a better API module
        http.get('http://localhost:5000/api/v1/homepage/stan/hooms').accept('application/json').end(function (err, res) {
            if (err) {
                console.log('hoomAction:load(' + homepageSlug + ') HTTP Failed');
                Dispatcher.handleServerAction({
                    actionType: ActionTypes.LOAD_HOOMS_ERROR,
                    homepageSlug: homepageSlug,
                    err: err
                });
                return;
            }

            console.log('hoomAction:load(' + homepageSlug + ') HTTP Success');
            Dispatcher.handleServerAction({
                actionType: ActionTypes.LOAD_HOOMS_SUCCESS,
                homepageSlug: homepageSlug,
                hooms: res.body.hooms
            });
            if (cb) {
                cb();
            }
        });
    },

    getEmbedCode(hoomId) {
        console.log('hoomAction:getEmbedCode(' + hoomId + ')');
        return when.promise(function(resolve, reject) {
            // TODO Refactor with a better API module
            http.get('/api/v1/hoom/' + hoomId + '/oembed').accept('application/json').end(function (err, res) {
                if (err) {
                    console.log('hoomAction:getEmbedCode(' + hoomId + ') HTTP Failed');
                    return reject(err);
                }
                console.log('hoomAction:getEmbedCode(' + hoomId + ') HTTP Success');
                resolve(res.body);
            });
        });
    }

};
