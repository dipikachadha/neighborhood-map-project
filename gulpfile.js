const gulp = require('gulp');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const pump = require('pump');

const paths = {
  origJS: "src/js/*.js",
  origCSS: "src/css/*.css",
  origHTML: "src/*.html",
  destJS: "dist/js/",
  destCSS: "dist/css/",
  destHTML: "dist/"
}

gulp.task('compress-js', cb => {
  pump([
    gulp.src(paths.origJS),
    uglify(),
    gulp.dest(paths.destJS)
  ],
  cb
  );
});

gulp.task('compress-css', () => {
  return gulp.src(paths.origCSS)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.destCSS));
});

gulp.task('compress-html', function() {
  return gulp.src(paths.origHTML)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.destHTML));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.origJS, ['compress-js']);
  gulp.watch(paths.origCSS, ['compress-css']);
  gulp.watch(paths.origHTML, ['compress-html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default',
  ['watch', 'compress-js', 'compress-css', 'compress-html']);
