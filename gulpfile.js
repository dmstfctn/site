'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var ftp = require( 'vinyl-ftp' );
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

gulp.task('css-minify', () => {
  return gulp.src('./assets/styles/src/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./assets/styles/dist'));
});

gulp.task( 'browserify', function(){
	var b = browserify({
    entries: './assets/javascript/src/main.js',
    debug: true
  });
  return b.bundle()
	  .pipe(source('./main.js')) // output file
	  .pipe(buffer())
	  .pipe(gulp.dest('./assets/javascript/dist/')); // output folder
});

gulp.task('browserify-minify', function () {
  var b = browserify({
    entries: './assets/javascript/src/main.js',
    debug: true
  });

  return b.bundle()
	  .pipe(source('./main.js')) // output file
	  .pipe(buffer())
	  .pipe(sourcemaps.init({loadMaps: true}))
	      // Add transformation tasks to the pipeline here.
	      .pipe(uglify())
	      .on('error', gutil.log)
	  .pipe(gulp.dest('./assets/javascript/dist/')); // output folder
});

gulp.task('watch', function () {
	return watch( './assets/javascript/src/**/*.js', function(){
		gulp.start('browserify');
	});
});

gulp.task( 'pack', function(){
	gulp.start('minify-css');
	gulp.start('browserify-minify');
});

// gulp.task('watch-pack', function () {
// 	watch( './assets/javascript/src/**/*.js', function(){
// 		gulp.start('browserify-minify');
// 	});
//   return watch('./assets/styles/src/**/*.css', function(){
// 		gulp.start('css-minify');
// 	});
// });

gulp.task('watch-pack-js', function () {
	console.log('watch-pack-js ready');
	return watch( './assets/javascript/src/**/*.js', function(){
		console.log('watch-pack-js running');
		gulp.series('browserify-minify')();
	});
});

gulp.task('watch-pack-css', function(){
	console.log('watch-pack-css ready');
  return watch('./assets/styles/**/*.css')
	.on('change', function( path, stats ){
		console.log('watch-pack-css running');
		gulp.series('css-minify')();
	});
});

gulp.task( 'watch-pack', gulp.parallel('watch-pack-js', 'watch-pack-css'));