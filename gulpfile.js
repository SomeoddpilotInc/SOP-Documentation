var gulp = require("gulp");
var stylus = require("gulp-stylus");
var normalize = require("normalize");

gulp.task("styles", function () {
  gulp.src("./stylus/style.styl")
    .pipe(stylus({
      include: [
        normalize.path,
      ],
    }))
    .pipe(gulp.dest("./css"));
});

gulp.task("watch", function () {
  gulp.watch("./stylus/*.styl", ["styles"]);
});

gulp.task("default", ["styles"]);
