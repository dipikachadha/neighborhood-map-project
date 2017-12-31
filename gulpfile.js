const gulp = require('gulp');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);

gulp.task('compress-js', () => {
    return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
});

const cleanCSS = require('gulp-clean-css');

gulp.task('compress-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});
