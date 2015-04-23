var gulp = require('gulp');
var del = require('del');
var fs = require('fs');
var assert = require('assert');
require('./gulpfile');

describe('Documentation framework', function () {
  beforeEach(function (done) {
    del('build', done);
  });

  it('should create index.html file', function (done) {
    gulp.start('html', function () {
      assert.equal(fs.existsSync('./build/index.html'), true);
      done();
    });
  });
});
