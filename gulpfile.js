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

gulp.task("styles", function () {
  gulp.src("./stylus/style.styl")
    .pipe(stylus({
      include: [
        normalize.path,
      ],
    }))
    .pipe(gulp.dest("./css"));
});

gulp.task("scripts", function () {
  var bundler = watchify(browserify("./js/main.js", watchify.args));

  bundler.on("update", rebundle);

  function rebundle() {
    return bundler.bundle()
      .on("error", gutil.log.bind(gutil, "Browserify Error"))
      .pipe(source("./app.js"))
      .pipe(buffer())
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest("./js/"));
  }

  return rebundle();
});

gulp.task("watch", function () {
  gulp.watch("./stylus/*.styl", ["styles"]);
});

gulp.task("default", ["styles", "scripts"]);
