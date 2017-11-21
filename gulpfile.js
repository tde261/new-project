var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var uglify = require('gulp-uglify');
var csisnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');

gulp.task('sass', function(){
return gulp.src('app/scss/styles.scss')
.pipe(sass()) // используем gulp-sass
.pipe(gulp.dest('app/css'))
.pipe(browserSync.reload({
stream: true
}))
});

gulp.task('watch', ['browserSync'], function(){
gulp.watch('app/scss/**/*.scss', ['sass']);
gulp.watch('app/*.html', browserSync.reload);
gulp.watch('app/js/**/*.js', browserSync.reload);
gulp.watch('app/css/**/*.css', browserSync.reload);
gulp.watch('app/**/*.php', browserSync.reload);
// другие ресурсы
})

gulp.task('browserSync', function() {
browserSync({
proxy: "new-project"
})
})

gulp.task('useref', function(){

 
return gulp.src('app/*.html')
.pipe(useref())
// Минифицируем только CSS файлы
.pipe(gulpIf('*.css', minifyCSS()))
// Uglifies only if it's a Javascript file
.pipe(gulpIf('*.js', uglify()))
.pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
.pipe(imagemin({
interlaced: true,
}))
.pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
return gulp.src('app/fonts/**/*')
.pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean', function() {
del('dist')
})

gulp.task('clean:dist', function(){
del(['dist/**/*', '!dist/images', '!dist/images/**/*'])
});

gulp.task('build', function(callback) {
runSequence(
	'clean:dist',
	'sass',
    ['useref', 'images', 'fonts'],
    callback
  )
});

gulp.task('default', function (callback) {
runSequence(['sass','browserSync', 'watch'],
callback
)
})

 
gulp.task('ftp', function () {
    return gulp.src('dist/**/*')
        .pipe(ftp({
            host: 'x92787dd.beget.tech',
            user: 'x92787dd_ftp',
            pass: 'Denis123',
            remotePath: '/x92787dd.beget.tech/public_html/'
        }))
        // you need to have some kind of stream after gulp-ftp to make sure it's flushed 
        // this can be a gulp plugin, gulp.dest, or any kind of stream 
        // here we use a passthrough stream 
        .pipe(gutil.noop());
});