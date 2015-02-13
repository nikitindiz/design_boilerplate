var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    mainBowerFiles = require('main-bower-files'),
    concat = require('gulp-concat'),
    gulpFilter = require('gulp-filter');

// Watch Changes in Files
gulp.task('watchFiles', function() {
  gulp.watch('./js/*.js', ['taskJs']);
  gulp.watch('./sass/*.sass', ['taskCss']);
  gulp.watch('../index.html', ['reloadPage']);
});

gulp.task('reloadPage', function() {
  browserSync.reload({stream:false});
});

// Script Task
gulp.task('taskJs', function() {

  var jsFilter = gulpFilter('*.js');

  gulp.src(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(plumber())
    .pipe(gulp.dest('../js/'));

  gulp.src('js/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../js/'))
    .pipe(browserSync.reload({stream:true}));

});

// Convert SASS and Uglify CSS
gulp.task('taskCss', function() {
  return sass('sass/style.sass', { verbose: true, style: "compressed" })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest('../css/'))
    .pipe(browserSync.reload({stream:true}));
});

// Browser Live View
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "../",
            index: "index.html"
        }
    });
});

gulp.task('default', ['taskJs', 'taskCss', 'browserSync', 'watchFiles']);
