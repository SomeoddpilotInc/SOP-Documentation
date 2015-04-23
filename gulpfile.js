/* eslint-env node */

var gulp = require("gulp");

require('./tasks/connect');
require('./tasks/html');
require('./tasks/styles');

gulp.task("watch", function watchTask() {
  gulp.watch("./content.md", ["html"]);
  gulp.watch("./stylus/*.styl", ["html"]);
});

gulp.task("default", ['html', "connect", "watch"]);
