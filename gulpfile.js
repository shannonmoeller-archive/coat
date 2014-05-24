'use strict';

var gulp = require('gulp'),
	shell = require('gulp-shell'),
	paths = {
		gulp: './gulpfile.js',
		src: './src/**/*.js',
		test: './test/*Spec.js'
	};

gulp.task('default', ['lint', 'test']);

gulp.task('lint', function () {
	var jscs = require('gulp-jscs'),
		jshint = require('gulp-jshint');

	return gulp
		.src([paths.gulp, paths.src, paths.test])
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test-cover', function () {
	var istanbul = require('gulp-istanbul');

	return gulp
		.src(paths.src)
		.pipe(istanbul());
});

gulp.task('test-run', ['test-cover'], shell.task([
	'zuul --phantom ' + paths.test
]));

gulp.task('test', ['test-run'], function () {
	var istanbul = require('gulp-istanbul');

	return gulp
		.src(paths.src)
		.pipe(istanbul.writeReports());
});

gulp.task('watch', function () {
	var lr = require('gulp-livereload'),
		watch = require('gulp-watch');

	watch({ glob: [paths.src, paths.test] }).pipe(lr());
});
