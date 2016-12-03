'use strict';

var gulp = require('gulp');
var gls = require('gulp-live-server');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
  return gulp.src(['test/*.js'], { read: false })
  .pipe(mocha());
});

gulp.task('default', ['test']);
