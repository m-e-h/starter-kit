/**
 * MEH gulp
 */

var gulp = require('gulp'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	sass = require('gulp-sass'),
	gulpif = require('gulp-if'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	changed = require('gulp-changed'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	csscomb = require('gulp-csscomb'),
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync').create('meh'),
	reload = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	browsers = [
		'ie >= 9',
		'ie_mob >= 10',
		'ff >= 30',
		'chrome >= 42',
		'safari >= 7',
		'opera >= 30',
		'ios >= 7.1',
		'android >= 4.3',
		'bb >= 10'
	];

// Optimize Images
gulp.task('images', function() {
	return gulp.src('assets/src/images/**/*')
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			removeUselessStrokeAndFill: true,
			removeEmptyAttrs: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
		}))
		.pipe(gulpif('*.svg', rename({
			prefix: 'svg-',
			extname: '.php'
		})))
		.pipe(gulp.dest('assets/images'));
});

// Copy hybrid-core to extras
gulp.task('hybrid', function() {
	return gulp.src([
			'vendor/justintadlock/hybrid-core/**/*'
		])
		.pipe(gulp.dest('lib/hybrid-core'));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function() {
	return gulp.src([
			'assets/src/styles/style.scss'
		])
		.pipe(changed('styles', {
			extension: '.scss'
		}))
		.pipe(sass())
		.on('error', swallowError)
		.pipe(autoprefixer(browsers))
		.pipe(csscomb())
		.pipe(gulp.dest('./'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifyCSS({compatibility: '-units.pc,-units.pt'}))
		.pipe(gulp.dest('./'))
		.pipe(reload({
			stream: true
		}));
});

// Compile Editor Stylesheets
gulp.task('wpeditor', function() {
	return gulp.src([
			'assets/src/styles/editor-style.scss'
		])
		.pipe(changed('styles', {
			extension: '.scss'
		}))
		.pipe(sass())
		.on('error', swallowError)
		.pipe(autoprefixer(browsers))
		.pipe(minifyCSS())
		.pipe(gulp.dest('assets/css'))
});

// Allows gulp to not break after a sass error.
// Spits error out to console
function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
}

// Concatenate And Minify JavaScript
gulp.task('scripts', function() {
	var sources = [
    // Component handler
    //'assets/src/scripts/mdlComponentHandler.js',
    // Polyfills/dependencies
		'assets/src/scripts/classList.js',
    //'src/third_party/**/*.js',
		// My scripts
		'assets/src/scripts/main/**/*.js',
    // Base components
    //'assets/src/scripts/mdl/button.js',
    //'assets/src/scripts/mdl/checkbox.js',
    //'assets/src/scripts/mdl/icon-toggle.js',
    //'assets/src/scripts/mdl/menu.js',
    //'assets/src/scripts/mdl/progress.js',
    //'assets/src/scripts/mdl/radio.js',
    //'assets/src/scripts/mdl/slider.js',
    //'assets/src/scripts/mdl/spinner.js',
    //'assets/src/scripts/mdl/switch.js',
    //'assets/src/scripts/mdl/tabs.js',
    //'assets/src/scripts/mdl/textfield.js',
    //'assets/src/scripts/mdl/tooltip.js',
    // Complex components (which reuse base components)
    //'assets/src/scripts/mdl/layout.js',
    //'assets/src/scripts/mdl/data-table.js',
    // And finally, the ripples
    //'assets/src/scripts/mdl/ripple.js'
  ];
  return gulp.src(sources)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('assets/js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(gulp.dest('assets/js'));
});

// Build and serve the output
gulp.task('serve', ['styles'], function() {
	browserSync.init({
		//proxy: "local.wordpress.dev"
		//proxy: "local.wordpress-trunk.dev"
		//proxy: "stmark.dev"
    //proxy: "school1.dev"
		proxy: "doc.dev"
		//proxy: "127.0.0.1:8080/wordpress/"
	});

	gulp.watch(['assets/src/styles/**/*.{scss,css}'], ['styles', reload]);
	gulp.watch(['assets/src/scripts/**/*.js'], reload);
	gulp.watch(['assets/src/images/**/*'], reload);
	gulp.watch(['*/**/*.php'], reload);
});

// Build Production Files, the Default Task
gulp.task('default', function(cb) {
	runSequence('styles', [/*'hybrid',*/ 'wpeditor', 'scripts', 'images'], cb);
});
