'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('test', ['prod', 'server'], function () {

    return runSequence('unit', 'protractor');

});