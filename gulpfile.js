var syntax         = 'scss', // Syntax: sass || scss;
		gulpVersion    = '4'; // Gulp version: 3 || 4

var gulp          = require('gulp'),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
    notify        = require('gulp-notify'),
		rsync         = require('gulp-rsync'),
    imagemin      = require('gulp-imagemin'),
		del           = require('del');

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	})
});

// Sass|Scss Styles
gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function() {
	return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/modernizr/modernizr.js',
		'app/libs/waypoints/waypoints.min.js',
		'app/libs/animate/animate-css.js',
		'app/libs/animateNumber/jquery.animateNumber.min.js',
		'app/libs/owlcarousel/dist/owl.carousel.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

// HTML Live Reload
gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

// Remove dist
gulp.task('removedist', function() { return del.sync('dist'); });

// Image min
gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img')); 
});

// Prebuild
gulp.task('buildFiles', function() {
  return gulp.src([
    'app/*.html',
    'app/.htaccess',
    ]).pipe(gulp.dest('dist'));
});
    
gulp.task('buildCss', function() {
  return gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));
});

gulp.task('buildJs', function() {
  return gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));
});

gulp.task('buildFonts', function() {
  return gulp.src([
		'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));
});

// Build
gulp.task('build', gulp.series('imagemin', 'styles', 'scripts', 'buildFiles', 'buildCss', 'buildJs', 'buildFonts', function(done){
  done();
}));

// Deploy
gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

// If Gulp Version 3
if (gulpVersion == 3) {

	var taskArr = ['styles', 'scripts', 'browser-sync'];

	gulp.task('watch', taskArr, function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
		gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
		gulp.watch('app/*.html', ['code']);
  });
  
	gulp.task('default', ['watch']);

};

// If Gulp Version 4
if (gulpVersion == 4) {

	gulp.task('watch', function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
		gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
		gulp.watch('app/*.html', gulp.parallel('code'));
  });
  
  gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));

};
