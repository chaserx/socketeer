var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');

// Tasks
gulp.task('jshint', function() {
  return gulp.src('app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('app.js', ['jshint']);
  gulp.watch('source/**/*.html', ['html'])
  gulp.watch('source/**/*.css', ['css'])
  gulp.watch('source/**/*.js', ['js'])
});

gulp.task('liveserver', function() {
  // listen for changes
  livereload.listen();
  // configure nodemon
  nodemon({
    // the script to run the app
    script: 'app.js',
    ext: 'js'
  }).on('restart', function(){
    // when the app has restarted, run livereload.
    gulp.src('app.js')
      .pipe(livereload())
      .pipe(notify('Reloading page, please wait...'));
  })
});

gulp.task('transport_bower_libs', function(){
  gulp.src('bower_components/**/*', {
    base: 'bower_components'
  }).pipe(gulp.dest('dist/bower_components/'));
});

gulp.task('css', function(){
  gulp.src('source/**/*.css').pipe(gulp.dest('dist'));
});

gulp.task('js', function(){
  gulp.src('source/**/*.js').pipe(gulp.dest('dist'));
});

gulp.task('audio', function(){
  gulp.src('source/**/*.m4a').pipe(gulp.dest('dist'));
});

gulp.task('html', function(){
  gulp.src('source/**/*.html').pipe(gulp.dest('dist'));
});

gulp.task('default', ['transport_bower_libs', 'audio', 'css', 'js', 'html', 'watch', 'liveserver']);
