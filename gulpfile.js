'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    appServer = require('./backend/config/app'),
    argv = require('minimist')(process.argv.slice(2));

var RELEASE = !!argv.release;
var src = {
    assets: 'frontend/assets/**',
    images: 'frontend/images/**',
    styles: 'frontend/styles/**/*.{css,less}',
    style:  'frontend/styles/main.less',
    views:  'frontend/component/**/*.{html}'
};

var build = {
    root:   './build',
    images: './build/images',
    views:  './build/views',
    styles: './build/css'
}

// The default task
gulp.task('default', ['serve']);

// Clean up
gulp.task('clean', del.bind(null, [build.root]));

// Static files
gulp.task('assets', function() {
  return gulp.src(src.assets)
      .pipe($.changed(build.root))
      .pipe(gulp.dest(build.root))
      .pipe($.size({title: 'assets'}));
});

// Images
gulp.task('images', function() {
    return gulp.src(src.images)
        .pipe($.changed(build.images))
        .pipe($.imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(build.images))
        .pipe($.size({title: 'images'}));
});

// CSS style sheets
gulp.task('styles', function() {
    return gulp.src(src.style)
        .pipe($.plumber())
        .pipe($.less({
            sourceMap: !RELEASE,
            sourceMapBasepath: __dirname
        }))
        .on('error', console.error.bind(console))
        .pipe($.minifyCss())
        .pipe(gulp.dest(build.styles))
        .pipe($.size({title: 'styles'}));
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('./frontend/**/*.js')
      .pipe(jshint())
    // You can look into pretty reporters as well, but that's another story
      .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('js', function() {
    // Concat all frontend javascript files
    gulp.src([
        './node_modules/angular/angular.js',
        './frontend/app.js',
        './frontend/component/**/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(build.root));
});

// Views task
gulp.task('views', function() {
    gulp.src(src.views).pipe(gulp.dest(build.views));
});

// Build the app from source code
gulp.task('build', ['clean'], function(callback) {
    runSequence(['js', 'assets', 'images', 'styles', 'lint', 'views'], callback);
});

// Launch a lightweight HTTP Server
gulp.task('serve', function(callback) {
    runSequence('build', function() {
        var server = appServer.listen(appServer.get('port'), function() {
            console.log("Listening on " + appServer.get('port'));
        });

        var launchServer = function() {
            server.close();
            server = appServer.listen(appServer.get('port'), function() {
                console.log("Listening on " + appServer.get('port'));
            });
        };

        gulp.watch(src.assets,  ['assets']);
        gulp.watch(src.images,  ['images']);
        gulp.watch(src.styles,  ['styles']);
        gulp.watch(src.views,   ['views']);
        gulp.watch([
                './frontend/app.js',
                './frontend/component/**/*.js'
            ], [
                'js',
                'lint'
        ]);
        gulp.watch(src.root + '/**/*.*',    launchServer);
        gulp.watch('backend/**/*.*',        launchServer);
        callback();
    });
});