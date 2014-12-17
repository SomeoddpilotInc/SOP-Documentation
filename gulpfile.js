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

gulp.task("styles", function () {
  "use strict";

  gulp.src("./stylus/style.styl")
    .pipe(stylus({
      include: [
        normalize.path
      ]
    }))
    .pipe(gulp.dest("./css"));
});

gulp.task("scripts", function () {
  "use strict";

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

gulp.task("connect", function () {
  "use strict";

  connect.server();
});

gulp.task("watch", function () {
  "use strict";

  gulp.watch("./stylus/*.styl", ["styles"]);
});

gulp.task("default", ["styles", "scripts", "connect", "watch"]);
