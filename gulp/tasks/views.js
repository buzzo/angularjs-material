'use strict';

var config = require('../config');
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var processhtml = require('gulp-processhtml');

// Views task
gulp.task('views', function () {
    // Put index.html and login.html in the dist folder

    if (global.isProd) {
        gulp.src('app/index.html')
            .pipe(gulp.dest(config.dist.root));
    } else {
        gulp.src('app/index.html')
            .pipe(processhtml())
            .pipe(gulp.dest(config.dist.root));
    }
    gulp.src('app/login.html')
        .pipe(gulp.dest(config.dist.root));

    // Process any other view files from app/views
    return gulp.src(config.views.src)
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest(config.views.dest));

});