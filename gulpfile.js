'use strict'

const gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	pug = require('gulp-pug'),
	browserSync = require('browser-sync').create(),
	spritesmith = require('gulp.spritesmith'),
	imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

const jsSources = [
	'./node_modules/flickity/dist/flickity.pkgd.js',
	'./node_modules/flickity-imagesloaded/flickity-imagesloaded.js',
	'./src/js/main.js'
];

function style() {
	return gulp.src('./src/sass/style.scss')
					.pipe(sourcemaps.init())
					.pipe(sass({
						includePaths: require('node-normalize-scss').includePaths
					}).on('error', sass.logError))
					.pipe(cleanCSS({level: 2}))
					.pipe(autoprefixer({
						browsers: ['> 0.1%'],
						cascade: false
					}))
					.pipe(sourcemaps.write('./maps'))
					.pipe(gulp.dest('./build/css'))
					.pipe(browserSync.stream());
}

function script() {
	return gulp.src(jsSources)
					.pipe(sourcemaps.init())
					.pipe(babel({
						presets: ['@babel/env']
					}))
					.pipe(concat('main.js'))
					.pipe(uglify({
						toplevel: true
					}))
					.pipe(sourcemaps.write('./maps'))
					.pipe(gulp.dest('build/js'))
					.pipe(browserSync.stream());
}

function views() {
	return gulp.src('./src/views/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('build'))
}

function compressImg(done) {
	gulp.src('./src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/images/'));
	done();
}

function sprite (done) {
	let spriteData = gulp.src('src/sprites/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		imgPath: '../images/sprite.png',
		cssName: 'sprite.scss',
		cssFormat: 'scss',
		padding: 2
	}));

	spriteData.img.pipe(gulp.dest('build/images/'));
	spriteData.css.pipe(gulp.dest('./src/sass/partials/'));
	done();
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "build"
		},
		tunnel: true
	});

	gulp.watch('./src/images/*', compressImg);
	gulp.watch('./src/sprites/*.png', sprite);
	gulp.watch('./src/sass/**/*.scss', style);
	gulp.watch('./src/js/**/*.js', script);
	gulp.watch('./src/views/**/*.pug', views);
}

function clean() {
	return del(['build/*']);
}

gulp.task('fonts', function () {
	return gulp.src(['./src/fonts/**/*.*', './node_modules/@fortawesome/fontawesome-free/webfonts/*.*'])
		.pipe(gulp.dest('build/fonts'));



});

gulp.task('sprite', sprite);
gulp.task('compressImg', compressImg);
gulp.task('views', views);
gulp.task('style', style);
gulp.task('script', script);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, sprite, compressImg, gulp.parallel('fonts', style, script, views)));

gulp.task('dev', gulp.series('build', 'watch'));