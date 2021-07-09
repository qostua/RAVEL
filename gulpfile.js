const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const fileinclude = require('gulp-file-include');

const notify = require('gulp-notify');
const rename = require('gulp-rename');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
// const fs = require('fs');

const concat = require('gulp-concat');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;


const svgSprites = () => {
	return src('./src/img/icon-*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			}
		}))
		.pipe(dest('./app/img'))
}
const styles = () => {
  return src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
      }
    ).on('error', notify.onError()))
    // Обработчик ошибок
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());
}
const htmlInclude = () => {
	return src(['./src/index.html'])
		.pipe(fileinclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(dest('./app'))
		.pipe(browserSync.stream());
}
const imgToApp = () => {
  return src('./src/img/**.{jpg,png,svg}')
    .pipe(dest('./app/img'))
}
const convertWebp = () => {
	return src(['./src/img/**.{jpg,png}', '!./src/img/css-*.{jpg,png}'])
		.pipe(webp({quality: 90}))
		.pipe(dest('./app/img'))
}
const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./app'))
}
const clean = () => {
	return del(['app/*'])
}
const scripts = () => {
	return src([
		'./src/js/main.js'
	])
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); // Don't stop the rest of the task
		})

		.pipe(sourcemaps.init())
		.pipe(uglify().on("error", notify.onError()))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/js'))
		.pipe(browserSync.stream());
}
const scriptLibs = () => {
	return src([
		'libs/bower_components/jquery/dist/jquery.slim.min.js',
		'libs/bower_components/air-datepicker/dist/js/datepicker.js',
		'libs/jQuery-Select/js/jquery.nice-select.js',
		'libs/jRange-master/jquery.range.js',
		'src/js/libs.js'
	])
	.pipe(concat('libs.js'))
	.pipe(uglify().on("error", notify.onError()))
  .pipe(dest('app/js/'));
}

const fonts = () => {
  src('./src/fonts/**.{ttf,woff,woff2}')
		.pipe(ttf2woff())
		.pipe(dest('./app/fonts'))
	return src('./src/fonts/**.{ttf,woff,woff2}')
	.pipe(ttf2woff2())
	.pipe(dest('./app/fonts'))
}

// const cb = () => {}
// let srcFonts = './src/scss/font.scss';
// let appFonts = './app/fonts/';
// const fontsStyle = (done) => {
// 	let file_content = fs.readFileSync(srcFonts);
//
// 	fs.writeFile(srcFonts, '', cb);
// 	fs.readdir(appFonts, function (err, items) {
// 		if (items) {
// 			let c_fontname;
// 			for (var i = 0; i < items.length; i++) {
// 				let fontname = items[i].split('.');
// 				fontname = fontname[0];
// 				if (c_fontname != fontname) {
// 					fs.appendFile(srcFonts, '@include font-face("' + fontname + '", "' + fontname + '", 400);\r\n', cb);
// 				}
// 				c_fontname = fontname;
// 			}
// 		}
// 	})
//
// 	done();
// }
const watchFiles = () => {
  browserSync.init({
        server: {
            baseDir: "./app"
        },
        cors: true,
        notify: false,
        ui: false,
    });

    watch('./src/scss/**/*.scss', styles);
    watch('./src/index.html', htmlInclude);
    watch('./src/img/**.{jpg,png,svg}', imgToApp);
		watch('./src/img/**.{jpg,png}', convertWebp);
    watch('./src/img/**.svg', svgSprites);
		watch('./src/resources/**', resources);
		watch('./src/fonts/**.{ttf,woff,woff2}', fonts);
		watch('./src/js/**/*.js', series(scripts, scriptLibs));
}

exports.styles = styles;
exports.scriptLibs = scriptLibs;
exports.watchFiles = watchFiles;
exports.fileinclude = htmlInclude;
exports.default = series(parallel(htmlInclude, scripts, scriptLibs, fonts, svgSprites, resources), styles, watchFiles);
// exports.default = series(clean, parallel(htmlInclude, scripts, scriptLibs, fonts, imgToApp, convertWebp, svgSprites, resources), styles, watchFiles);

const stylesBuild = () => {
  return src('./src/scss/main.scss')
    .pipe(sass({
        outputStyle: 'expanded'
      }
    ).on('error', notify.onError()))
    // Обработчик ошибок
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('./app/css/'))
}
const scriptsBuild = () => {
	return src('./src/js/main.js')
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); // Don't stop the rest of the task
		})

		.pipe(uglify().on("error", notify.onError()))
		.pipe(dest('./app/js'))
}
const images = () => {
	return src('./src/img/*.{jpg,png,svg}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.svgo()
		]))
		.pipe(dest('./app/img'))
}

exports.build = series(clean, parallel(htmlInclude, scriptsBuild, fonts, imgToApp, convertWebp, svgSprites, resources), stylesBuild, images);
