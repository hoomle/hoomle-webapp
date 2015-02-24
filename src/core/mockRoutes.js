'use strict';

module.exports = function(server) {

    server.get('/api/v1/homepage/stan', function(req, res) {
        res
            .contentType('application/json')
            .send({
                slug: 'stan',
                displayName: 'Stan Chollet',
                location: 'Orléans, France',
                headline: 'Passionate about travel, software development and sport. <br /> Software Developer at @MeeticFrance',
                photos: {
                    cover: 'http://localhost:5000/mock/cover.jpg',
                    profile: 'http://localhost:5000/mock/profile.png'
                },
                // only-cover | cover-and-photo | only-photo
                // template: 'only-photo'
                template: 'cover-and-photo'
                // template: 'only-cover'
            });
    });

    server.get('/api/v1/homepage/stan/hooms', function(req, res) {
        res
            .contentType('application/json')
            .send({
                limit: 25,
                offset: 0,
                hooms: [
                    {
                        id: '1234521421421',
                        source: 'twitter',
                        sourceUrl: 'http://source-url.com'
                    },
                    {
                        id: '1234521421422',
                        source: 'instagram',
                        sourceUrl: 'http://source-url.com'
                    },
                    {
                        id: '1234521421423',
                        source: 'rss',
                        sourceUrl: 'http://source-url.com',
                        title: 'Faire du snorkeling à Koh Koh Phi Phi'
                    }
                ]
            });
    });

    server.get('/api/v1/hooms/1234521421421/oembed', function(req, res) {
        res
            .contentType('application/json')
            .send({
                "cache_age": "3153600000",
                "url": "https:\/\/twitter.com\/tsunammis\/statuses\/569510746733719553",
                "height": null,
                "provider_url": "https:\/\/twitter.com",
                "provider_name": "Twitter",
                "author_name": "Stan Chollet",
                "version": "1.0",
                "author_url": "https:\/\/twitter.com\/tsunammis",
                "type": "rich",
                "html": "\u003Cblockquote class=\"twitter-tweet\" data-cards=\"hidden\" align=\"center\" width=\"350\"\u003E\u003Cp\u003ELes transports collectifs vont peut-\u00EAtre sauver la lecture \u003Ca href=\"https:\/\/t.co\/9Ts1sGCzUS\"\u003Ehttps:\/\/t.co\/9Ts1sGCzUS\u003C\/a\u003E\u003C\/p\u003E&mdash; Stan Chollet (@tsunammis) \u003Ca href=\"https:\/\/twitter.com\/tsunammis\/status\/569510746733719553\"\u003EFebruary 22, 2015\u003C\/a\u003E\u003C\/blockquote\u003E\n",
                "width": 350
            });
    });

    server.get('/api/v1/hooms/1234521421422/oembed', function(req, res) {
        res
            .contentType('application/json')
            .send({
                "provider_url": "http:\/\/instagram.com\/",
                "media_id": "558717847597368461_9538472",
                "author_name": "diegoquinteiro",
                "height": null,
                "thumbnail_url": "http:\/\/distilleryimage5.ak.instagram.com\/5dceebb02c5811e3b57222000a9e07e9_8.jpg",
                "thumbnail_width": 640,
                "thumbnail_height": 640,
                "provider_name": "Instagram",
                "title": "Wii Gato (Lipe Sleep)",
                "html": "\u003cblockquote class=\"instagram-media\" data-instgrm-version=\"4\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"\u003e\u003cdiv style=\"padding:8px;\"\u003e \u003cdiv style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;\"\u003e \u003cdiv style=\" background:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf\/\/42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB\/lQPb79drWOyJVa\/DAvg9B\/rLB4cC+Nqgdz\/TvBbBnr6GBReqn\/nRmDgaQEej7WhonozjF+Y2I\/fZou\/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"\u003e\u003c\/div\u003e\u003c\/div\u003e\u003cp style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\"\u003e\u003ca href=\"https:\/\/instagram.com\/p\/fA9uwTtkSN\/\" style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;\" target=\"_top\"\u003eA video posted by @diegoquinteiro\u003c\/a\u003e on \u003ctime style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2013-10-03T18:19:39+00:00\"\u003eOct 3, 2013 at 11:19am PDT\u003c\/time\u003e\u003c\/p\u003e\u003c\/div\u003e\u003c\/blockquote\u003e",
                "width": 658,
                "version": "1.0",
                "author_url": "http:\/\/instagram.com\/diegoquinteiro",
                "author_id": 9538472,
                "type": "rich"
            });
    });
};
