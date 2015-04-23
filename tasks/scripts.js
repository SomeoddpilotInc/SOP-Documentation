var gulp = require("gulp");
var watchify = require("watchify");
var gutil = require("gulp-util");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var browserify = require("browserify");
var ngAnnotate = require("gulp-ng-annotate");

gulp.task("scripts", function scriptsTask() {
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
