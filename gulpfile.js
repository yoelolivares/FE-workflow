'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
// const imagemin = require('gulp-imagemin');

const path = {
    css: {
        src: 'app/src/scss/styles.scss',
        dest: 'app/dist/css',

    },
    html: {
        src: 'app/src/*.html',
        dest: 'app/dist'
    },
    js : {
        src: 'app/src/js/*.js',
        dest: 'app/dist/js'
    },
    img: {
        src: 'app/src/img/*{.png,.jpg,.svg}',
        dest: 'app/dist/img'
    }
}

function html () {
    return gulp
    .src(path.html.src)
    .pipe(gulp.dest(path.html.dest))
    .pipe(browserSync.stream());
}

function css () {
   return gulp.src(path.css.src)
   .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.css.dest))
    .pipe(browserSync.stream());
}

function scripts () {
    return gulp
    .src(path.js.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.js.dest))
    .pipe(browserSync.stream());
}

// function image () {
//     return gulp
//     .src(path.img.src)
//     .pipe(imagemin())
//     .pipe(dest(path.img.dest))
//     .pipe(browserSync.stream())
// }
 
gulp.task('default', () =>
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.js.dest))
        .pipe(browserSync.stream())
);

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: './app/dist'
        }
    });
    
    gulp.watch(path.css.src, css)
    gulp.watch(path.js.src, scripts)
    gulp.watch(path.html.src, html).on('change' , browserSync.reload)
    //gulp.watch(path.img.src, image)
})

const build = gulp.parallel(css, scripts, html);
gulp.task('default', build);
