/* eslint-env node */

var gulp = require("gulp");
var stylus = require("gulp-stylus");
var normalize = require("normalize");
var watchify = require("watchify");
var gutil = require("gulp-util");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var browserify = require("browserify");
var ngAnnotate = require("gulp-ng-annotate");
var connect = require("gulp-connect");
var commonmark = require('commonmark');
var through = require('through2');
var rename = require('gulp-rename');
var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();
var fs = require('fs');
var handlebars = require('handlebars');

gulp.task("styles", function () {
  return gulp.src("./stylus/style.styl")
    .pipe(stylus({
      include: [
        normalize.path
      ]
    }))
    .pipe(gulp.dest("./css"));
});

gulp.task("scripts", function () {
  var bundler = watchify(browserify("./js/main.js", watchify.args));

  function rebundle() {
    return bundler.bundle()
      .on("error", gutil.log.bind(gutil, "Browserify Error"))
      .pipe(source("./app.js"))
      .pipe(buffer())
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest("./js/"));
  }

  bundler.on("update", rebundle);

  return rebundle();
});

gulp.task('html', function () {
  return gulp.src('content.md')
    .pipe(through.obj(function (file, enc, callback) {
      var parsed = reader.parse(file.contents.toString());
      var html = writer.render(parsed);

      file.contents = new Buffer(html);

      callback(null, file);
    }))
    .pipe(through.obj(function (file, enc, callback) {
      var html = handlebars.compile(fs.readFileSync('index.html', 'utf8'))({
        styles: fs.readFileSync('css/style.css', 'utf8'),
        contents: file.contents.toString()
      });

      file.contents = new Buffer(html);

      callback(null, file);
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('build'));
});

gulp.task("connect", function () {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task("watch", function () {
  gulp.watch("./stylus/*.styl", ["styles"]);
});

gulp.task("default", ["styles", "scripts", "connect", 'html', "watch"]);
