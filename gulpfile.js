var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var neat         = require('node-neat');
var bourbon      = require('node-bourbon');
var minifycss    = require('gulp-minify-css');
var rewritecss   = require('gulp-rewrite-css');
var livereload   = require('gulp-livereload');
var sprity       = require('sprity');
var gulpif       = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');

var changeEvent = function(evt) {
  // @TODO: Use util libraries to take out base dynamically
  //plugins.util.log('File', plugins.util.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + paths.cms_theme_path + ')/'), '')), 'was', plugins.util.colors.magenta(evt.type));
};

gulp.task('sprite', function () {
  return sprity.src({
    src: 'sprite/*.png',
    style: './_sprite.scss',
    cssPath: '../img/',
    processor: 'sass',
  })
  .pipe(gulpif('*.png', gulp.dest('./templates/img/'), gulp.dest('./templates/scss/')))
});

gulp.task('sass', function () {
  gulp.src('scss/main.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
          includePaths: require('node-bourbon').with(neat.includePaths, './node_modules/normalize.css-importable/')
        }))
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
    .pipe(sourcemaps.init())
    .pipe(minifycss())
    .pipe(gulp.dest('css/'));
});

// Task: Watch
gulp.task('watch', ['sass'], function () {
  livereload.listen();

  // Watch Sprite files
  gulp.watch('sprite/*.png', ['sprite']).on('change', function(evt) {
    changeEvent(evt);
  });

  // Watch Sass files
  gulp.watch('scss/**/*.*', ['sass']).on('change', function(evt) {
    changeEvent(evt);
  });

  // Watch CSS files
  gulp.watch('css/**/*.css').on('change', function(evt) {
    console.log('CSS Update - Livereload!');
    livereload.changed('css/main.css');
  });
});
