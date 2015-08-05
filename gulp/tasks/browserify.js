'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('browserify', function () {

    if(global.isProd) {
        return runSequence('browserify-main', 'browserify-login');
    } else {
        return runSequence('browserify-main-mock', 'browserify-login');
    }

});