const gulp = require('gulp');
const fs = require("fs");
const browserify = require("browserify");
const babelify = require("babelify");
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');


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

gulp.task('import-foundation', ['foundation-sass']);
gulp.task('import-foundation-js', ['foundation-js']);


gulp.task('bundle', function (){
  browserify({ debug: true })
    .transform(babelify)
    .require("app/js/app.js", { entry: true })
    .bundle()
    .on("error", function (err) { console.log("Error: " + err.message); })
    .pipe(fs.createWriteStream("public/js/bundle.js"));
})

gulp.task('sass', function () {
  gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('startServer', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('watch', function() {
  gulp.watch('app/js/**/*.js',['bundle']);
  gulp.watch('app/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'bundle', 'startServer', 'sass']);
