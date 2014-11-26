// Include gulp
var gulp = require('gulp');

var react = require('gulp-react'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    stylish = require('jshint-stylish'),
    sass = require('gulp-sass');


gulp.task('browserify', function () {
    gulp.src('src/main.js')
        .pipe(browserify({transform: "reactify"}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copyindex', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
    gulp.src(['src/*/*.js', 'src/*.js'])
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
        //.pipe(jshint.reporter('fail'));
});

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('src/main.js', ['browserify']);
    gulp.watch('src/index.html', ['copyindex']);
    gulp.watch(['src/*/*.js', 'src/*.js'], ['lint']);
});

gulp.task('default', ['lint', 'sass', 'browserify', 'copyindex', 'watch']);