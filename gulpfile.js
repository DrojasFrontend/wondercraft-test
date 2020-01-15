var gulp = require('gulp');
var	sass = require('gulp-sass');
var	autoprefixer = require('gulp-autoprefixer');
var	newer = require('gulp-newer');
var	sourcemaps = require('gulp-sourcemaps');
var	imagemin = require('gulp-imagemin');
var	browserSync = require('browser-sync').create();
var	reload = browserSync.reload;
var	concat = require('gulp-concat');
var	uglify = require('gulp-uglify');
var	watch = require('gulp-watch');
var	imgSrc = 'assets/images/originals/*';
var	imgDest = 'assets/images/';
var connect = require('gulp-connect-php');

gulp.task('browser-sync', function(){
	browserSync.init({
		//proxy: "localhost"
		server: {
            baseDir: "./"
		}
	});
});

gulp.task('watch', function() {
	// watch .scss files
	gulp.watch('assets/sass/*.scss', ['sass']).on("change", browserSync.reload);
	gulp.watch('assets/sass/**/*.scss', ['sass']).on("change", browserSync.reload);
	// Watch js Directory
	gulp.watch('assets/js/**/*.js', ['js']).on("change", browserSync.reload);
	// Watch original images directory
	gulp.watch(imgSrc, ['images']).on("change", browserSync.reload)
	// Watch PHP
	gulp.watch('./*.html', browserSync.reload);
});

gulp.task('sass', function(){
	return gulp.src('assets/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({ browsers: [ 'last 2 versions'], cascade: false } ))
		.pipe(sass({ outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./'));
});

var jsInput = { js:'assets/js/dev/**/*.js'}
var jsOutput = 'assets/js/dist';

gulp.task('js', function() {
	return gulp.src(jsInput.js)
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./assets/js/dist'))
});



gulp.task('images', function() {
	return gulp.src(imgSrc, { base: 'assets/images/originals'})
	.pipe(newer(imgDest))
	.pipe(imagemin ({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest(imgDest))
});



gulp.task('default', ['sass', 'browser-sync', 'watch', 'images', 'js']);

/*template and initial workflow*/ 
