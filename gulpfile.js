const gulp = require("gulp");
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const del = require("del");
const cssnano = require('cssnano');
const exec = require('child_process').exec;
const purgecss = require('gulp-purgecss');
const autoprefixer = require("autoprefixer");
const imagemin = require("gulp-imagemin");



function clean() {
    return del(['./static'])
}


function cacheBustTask() {
    var cbString = new Date().getTime();
    return src(['./templates/index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}


function scss() {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass())
        .pipe(postcss([autoprefixer(
            { browsers: ["last 10 version"] }),
        cssnano()
        ]))
        .pipe(gulp.dest("./static/styles"))
        .pipe(browserSync.stream());
}





/* JS files *** 
    1) Transpile using babel
    2) Combine all into 1 js file
    3) Minify Js code.
    4) Move to static folder
*/
function js() {
    return gulp.src("./src/js/**/*.js")
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./static/js"))
        .pipe(browserSync.stream());
}


function watch() {
    browserSync.init({
        proxy: "localhost:8082",
        ws: true
    });

    gulp.watch('./src/scss/**/*.scss', scss);
    gulp.watch("./src/js/**/*.js", js).on("change", browserSync.reload);
    gulp.watch('./templates/**/*.html').on('change', browserSync.reload);
}


// exports.watch = watch;
// exports.clean = clean;


gulp.task("sass", gulp.series(scss));
gulp.task("build", gulp.series(scss, js));
gulp.task("build-watch", gulp.series('build', watch));
gulp.task("dev", gulp.series(scss, js, watch));
