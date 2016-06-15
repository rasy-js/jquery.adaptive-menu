var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('minify-css', function() {
  return gulp.src('dist/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: "-min"}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css-t', function() {
  return gulp.src('dist/css/themes/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: "-min"}))
    .pipe(gulp.dest('dist/css/themes'));
});


gulp.task('minify-js', function() {
  return gulp.src('dist/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: "-min"}))
    .pipe(gulp.dest('dist/js'));
});