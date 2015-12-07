const gulp = require('gulp');
const fs = require("fs");
const browserify = require("browserify");
const babelify = require("babelify");
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const bufferifyify = require('vinyl-buffer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const argv = require('yargs').argv;
const livereload = require('gulp-livereload');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const scsslint = require('gulp-scss-lint');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

const dev = !argv.production ? true : false;


//Imports foundation sass into source/css folder
gulp.task('foundation-sass', function () {
  return gulp.src('./bower_components/foundation/scss/**/**.*')
  .pipe(gulp.dest('./app/scss/foundation'));
});
//Imports foundation js into source/js folder
gulp.task('foundation-js', function () {
  return gulp.src('./bower_components/foundation/js/**/**.*')
  .pipe(gulp.dest('./app/js/modules/foundation'));
});



gulp.task('startServer', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('bundle', () => {
  const bundler = browserify({
    cache: {},
    packageCache: {},
    entries: ['./app/js/app.js'],
    debug: dev
  });

  bundler.transform(babelify, {presets: ['es2015']});

  if (dev) bundler = watchify(bundler);

  bundler.on('update', bundle);

  function bundle() {
    return bundler
      .bundle()
      .pipe(source('./app/js/app.js'))
      .pipe(bufferifyify())
      .pipe(gulpif(!dev, uglify()))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('./public/js/'))
  }

  bundle();
});

gulp.task('sass', () => {
  gulp.src('./app/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: dev ? 'nested' : 'compressed'
    }).on('error', sass.logError))
    .pipe(gulpif(dev, sourcemaps.write()))
    .pipe(gulp.dest('./public/css'))
    .pipe(gulpif(dev, livereload()));
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('./app/scss/**/*.scss', ['sass']);
  gulp.watch('./app/js/**/*.js', ['bundle']);
});



gulp.task('compile', ['bundle', 'sass']);
gulp.task('import-foundation', ['foundation-sass']);
gulp.task('import-foundation-js', ['foundation-js']);
gulp.task('default', ['watch', 'bundle', 'startServer', 'sass']);
