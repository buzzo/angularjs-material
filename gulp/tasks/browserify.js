'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('browserify', function () {

    return runSequence('browserify-main', 'browserify-login');

});