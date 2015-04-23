var gulp = require("gulp");
var through = require('through2');
var rename = require('gulp-rename');
var commonmark = require('commonmark');
var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();
var fs = require('fs');
var handlebars = require('handlebars');
var _ = require('lodash');

function insertId(text, headingMatch, headingType) {
  return '<' + headingType + ' id="' + _.kebabCase(text) + '">';
}

function insertIdIntoHeadings(match, _headingType, text) {
  return match
    .replace(/<(h[1-6])>/, insertId.bind(this, text));
}

function markdownTransform(file, enc, callback) {
  var parsed = reader.parse(file.contents.toString());

  const headingRegex = /<(h[1-6])>(.*)<\/\1>/g;

  var html = writer.render(parsed)
    .replace(headingRegex, insertIdIntoHeadings);

  file.contents = new Buffer(html);

  callback(null, file);
}

function handlebarsTransform(file, enc, callback) {
  var html = handlebars.compile(fs.readFileSync('index.html', 'utf8'))({
    styles: fs.readFileSync('css/style.css', 'utf8'),
    contents: file.contents.toString()
  });

  file.contents = new Buffer(html);

  callback(null, file);
}

gulp.task('html', function htmlTask() {
  return gulp.src('content.md')
    .pipe(through.obj(markdownTransform))
    .pipe(through.obj(handlebarsTransform))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('build'));
});
