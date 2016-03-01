// Load plugins
//var gutil = require('gulp-util');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var del = require('del');
var blessed = require('blessed');
var tail = require('tail').Tail;

//gutil.log = gutil.noop;
notify.logLevel(0);

var traceLog = new tail('logs/log.log', '\n', {}, true);

traceLog.on('line', function(data) {
	var json = JSON.parse(data);
	logBox.pushLine('{red-fg}' + json.time + '{/red-fg} ' + json.msg);
	screen.render();
});

var screen = blessed.screen({
	smartCSR: true,
	dockBorders: true,
	resizeTimeout: 300,
	title: 'Gulp!'
});

var stylesBox = blessed.log({
	parent: screen,
	top: '0',
	left: '0',
	width: '50%',
	height: '50%',
	border: 'line',
	tags: true,
	keys: true,
	vi: true,
	mouse: true,
	scrollback: 100,
	scrollbar: {
		ch: ' ',
		fg: 'white',
		track: {
			bg: 'yellow'
		},
		style: {
			inverse: true,
		}
	},
	label: 'Styles log',
});

var scriptsBox = blessed.log({
	parent: screen,
	top: '50%',
	left: '0',
	width: '50%',
	height: '50%',
	border: 'line',
	tags: true,
	keys: true,
	vi: true,
	mouse: true,
	scrollback: 100,
	scrollbar: {
		ch: ' ',
		fg: 'white',
		track: {
			bg: 'yellow'
		},
		style: {
			inverse: true,
		}
	},
	label: 'Scripts log',
});

var logBox = blessed.log({
	parent: screen,
	top: '0',
	left: '50%',
	width: '50%',
	height: '100%',
	border: 'line',
	tags: true,
	keys: true,
	vi: true,
	mouse: true,
	scrollback: 100,
	scrollbar: {
		ch: ' ',
		fg: 'white',
		track: {
			bg: 'yellow'
		},
		style: {
			inverse: true,
		}
	},
	label: 'Bunyan',
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
	return screen.destroy();
});

// Render the screen.
screen.render();

// Styles
gulp.task('styles', function() {
	return gulp.src([
		'src/sass/main.scss'
	])
	.pipe(plumber({
		errorHandler: function (err) {
			stylesBox.pushLine(err.message);
			screen.render();

			notify.onError({
				title: 'Error in style stask',
				message: '<%= error.message %>'
			})(err);

			this.emit('end');
		}
	}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(gulp.dest('public/css'))
	.pipe(cssnano({ zindex: false }))
	.pipe(autoprefixer('last 2 version'))
	.pipe(gulp.dest('public/css'))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('public/css'))
	.pipe(notify(
		{
			title: 'Styles task completed',
			//message: 'Styles task completed',
			onLast: true 
		}
	));
});
 
// Scripts
gulp.task('scripts', function() {
	return gulp.src([
		'src/js/script.js'
	])
	.pipe(plumber({
		errorHandler: function (err) {
			scriptsBox.pushLine(err.message);
			screen.render();

			notify.onError({
				title: 'Error in scripts task',
				message: '<%= error.message %>',
			})(err);

			this.emit('end');
		}
	}))
	.pipe(rename({ suffix: '.min' }))
	.pipe(uglify())
	.pipe(gulp.dest('public/js'))
	.pipe(notify(
		{
			title: 'Scripts task completed',
			//message: 'Styles task completed',
			onLast: true 
		}
	));
});
 
// Watch - watcher for changes in scss and js files: 'gulp watch' will run these tasks
gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch('src/sass/**/*.scss', ['styles']);
 
	// Watch .js files
	gulp.watch('src/js/script.js', ['scripts']);
});

/*
// Build - task to concat and minify all javascript: 'gulp build' will run this task
gulp.task('vendor-scripts', function() {
	return gulp.src([
		'scripts/vendor/jquery-1.11.3.min.js',
		'scripts/vendor/jquery.validate.min.js',
		'scripts/vendor/jquery.validate.unobtrusive.min.js',
		'scripts/vendor/modal.js',
		'scripts/vendor/nouislider.min.js',
		'scripts/vendor/swiper.jquery.min.js',
		'scripts/vendor/jquery.cookie.js'
	])
	.pipe(plumber({
		errorHandler: function (err) {
			//console.log(err);
			notify.onError({
				message: 'Error in vendor-scripts task: <%= error.message %>'
			})(err);
			this.emit('end');
		}
	}))
	.pipe(concat('vendor.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('scripts'))
	.pipe(notify({ message: 'Vendor-scripts task completed' }));
});
*/

// Default - runs the scripts, styles and watch tasks: 'gulp' will run this task
gulp.task('default', ['scripts', 'styles', 'watch'])