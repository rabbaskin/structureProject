 var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	minifyCSS = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync').create(), // Static server
	del = require('del'),
	sass = require('gulp-sass');


gulp.task('del', function() {
	return del('build')
});
//connect server
gulp.task('style', function () {
  return gulp.src('source/sass/style.sass')
  	.pipe(sass())
  	.pipe(autoprefixer({browsers: ['last 15 versions']}))
  	.pipe(minifyCSS())
  	.pipe(rename({suffix: '.min'}))
  	.pipe(gulp.dest('build/styles'))
});

gulp.task('browser-sync', function() { 
	browserSync.init({
	 server: 'build'
	})
	browserSync.watch('build/**/*.*').on("change", browserSync.reload)
});

gulp.task('watch', function () {
	gulp.watch('source/sass/*.sass', ['style'])
	gulp.watch('source/index.html', ['html'])
});

gulp.task ('html', function () {
	return gulp.src('source/index.html')
	.pipe(gulp.dest('build'))
});

gulp.task('default', ['style', 'html', 'browser-sync', 'watch']);