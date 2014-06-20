'use strict';

var gulp = require('gulp');

var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

var rimraf = require('rimraf');

var paths = {
  scripts: ['dist/js/bootstrap.js', 'dist/js/angular.min.js'],
  images: 'img/*',
  css: ['dist/css/bootstrap.min.css', 'dist/css/portfolio.css', 'dist/css/fonts.css']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb){
  rimraf('build/', cb);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', ['clean'], function () {
  return gulp.src(paths.css)
    .pipe(minify())
    .pipe(concat('portfolio-common.min.css'))
    .pipe(gulp.dest('build/css'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
 return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'css', 'scripts', 'images']);
