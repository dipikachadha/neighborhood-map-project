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
  destHTML: "dist/",
  docs: "docs",
}

const docco = require("gulp-docco");
const eslint = require('gulp-eslint');

// configure the jshint task
gulp.task('lint', function() {
  return gulp.src(paths.origJS).pipe(eslint())
  .pipe(eslint.format())
  // Brick on failure to be super strict
  .pipe(eslint.failOnError());
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/javascript/**/*.js', ['jshint']);
});

gulp.task('create-js-docs', () => {
  return gulp.src(paths.origJS)
  .pipe(docco())
  .pipe(gulp.dest(paths.docs));
});

gulp.task('create-html-docs', () => {
  return gulp.src(paths.origHTML)
  .pipe(docco())
  .pipe(gulp.dest(paths.docs));
});

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
  gulp.watch(paths.origJS, ['compress-js', 'create-js-docs',
    'jshint']);
  gulp.watch(paths.origCSS, ['compress-css']);
  gulp.watch(paths.origHTML, ['compress-html',
    'create-html-docs']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default',
  ['watch', 'create-js-docs', 'create-html-docs',
  'compress-js', 'compress-css', 'compress-html']);
