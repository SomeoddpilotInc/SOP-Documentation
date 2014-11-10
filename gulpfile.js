var gulp = require("gulp");
var stylus = require("gulp-stylus");

gulp.task("styles", function () {
  gulp.src("./stylus/style.styl")
    .pipe(stylus())
    .pipe(gulp.dest("./css"));
});

gulp.task("watch", function () {
  gulp.watch("./stylus/*.styl", ["styles"]);
});

gulp.task("default", ["styles"]);
