 var gulp = require('gulp'),
	browserSync = require('browser-sync').create(), // Static server
	del = require('del'),
	$ = require('gulp-load-plugins')();

gulp.task('del', function() {
	return del('build')
});
//connect server
gulp.task('style', function () {
  return gulp.src('source/sass/style.sass')
  	.pipe($.sass())
  	.pipe($.autoprefixer({browsers: ['last 15 versions']}))
  	.pipe($.csso())
  	.pipe($.rename({suffix: '.min'}))
  	.pipe(gulp.dest('build/styles'))
});

gulp.task('scripts', function() {
	return gulp.src('source/js/**/*.js')
		.pipe(gulp.dest('build/js'))
})

gulp.task('browser-sync', function() { 
	browserSync.init({
	 server: 'build'
	})
	browserSync.watch('build/**/*.*').on("change", browserSync.reload)
});

gulp.task('watch', function () {
	gulp.watch('source/sass/*.sass', ['style'])
	gulp.watch('source/*.html', ['html'])
	gulp.watch('source/js/*.js', ['scripts'])
});

gulp.task ('html', function () {
	return gulp.src('source/index.html')
	.pipe(gulp.dest('build'))
});

gulp.task('default', ['style', 'html', 'browser-sync', 'watch']);