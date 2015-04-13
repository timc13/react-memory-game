var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify');

var config = {
  appDir: './app',
  appFile: 'main.js',
  destDir: './public',
  debug: false
  //debug: process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development'
}

gulp.task('default', ['app']);

gulp.task('app', function() {
  var bundler = browserify({
    entries: config.appDir + '/' + config.appFile,
    transform: [reactify],
    debug: config.debug
  });

  return bundler.bundle()
    .on('error', gutil.log)
    .pipe(source(config.appFile))
    .pipe(config.debug ? gutil.noop() : streamify(uglify()))
    .pipe(gulp.dest(config.destDir));
  });
