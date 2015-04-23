var gulp = require("gulp");
var stylus = require("gulp-stylus");
var stylus = require("gulp-stylus");
var normalize = require("normalize");

gulp.task("styles", function stylesTask() {
  return gulp.src("./stylus/style.styl")
    .pipe(stylus({
      include: [
        normalize.path
      ]
    }))
    .pipe(gulp.dest("build"));
});
