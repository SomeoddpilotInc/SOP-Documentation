var gulp = require("gulp");
var connect = require("gulp-connect");

gulp.task("connect", function connectTask() {
  connect.server({
    root: 'build',
    livereload: true
  });
});
