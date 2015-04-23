/* eslint-env node */

var gulp = require("gulp");

require('./tasks/connect');
require('./tasks/html');
require('./tasks/styles');

gulp.task("watch", function watchTask() {
  gulp.watch("./stylus/*.styl", ["styles"]);
});

gulp.task("default", ['html', "connect", "watch"]);
