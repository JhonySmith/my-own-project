const gulp = require('gulp');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const htmlMin = require('gulp-htmlmin');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const postcss = require('gulp-postcss');
const autoprfixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const { stream } = require('browser-sync');
const { src } = require('gulp');

//server
const server = (done) => {
  browserSync.init({
    server: {
      baseDir: 'public',
      index: 'index.html',
    },
    ui: false,
  });
  done();
};

exports.default = server;

// html
const html = () => {
  return gulp
    .src('src/*.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
};

exports.html = html;

// gup
const pugToHtml = () => {
  return gulp
    .src('src/*.pug')
    .pipe(pug())
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
};

exports.pugToHtml = pugToHtml;

exports.html = html;
// scss
const styles = () => {
  return gulp
    .src('src/style/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprfixer()]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
};

exports.styles = styles;

const typeScript = () => {
  return gulp
    .src('src/script/main.js')
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'bundle.js',
        },
      }),
    )
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
};

exports.typeScript = typeScript;

// copy
const copy = () => {
  return gulp.src(['src/fonts/**/*.{woff,woff2}']).pipe(gulp.dest('public/fonts'));
};

exports.copy = copy;

// img
const img = () => {
  return gulp.src(['src/img/**/*.{jpg,svg,png}']).pipe(gulp.dest('public/img'));
};

exports.copy = copy;

const watcher = () => {
  gulp.watch('src/*.pug', gulp.series('pugToHtml'));
  gulp.watch('src/style/**/*.scss', gulp.series('styles'));
  gulp.watch('src/script/**/*.js', gulp.series('typeScript'));
};

const build = gulp.series(pugToHtml, styles, typeScript, copy, img);

exports.build = build;

exports.default = gulp.series(build, server, watcher);
