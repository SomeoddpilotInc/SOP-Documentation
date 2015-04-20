var assert = require('chai').assert;
var DocumentationCtrl = require('./../src/DocumentationCtrl');
var Spy = require('sinon').spy;

describe('DocumentationCtrl', function () {
  it('should call $http', function () {
    var controller = new DocumentationCtrl({
      get: function () {
        return {
          success: function () {
            return {
              error: function () {
                console.log('foo');
              }
            };
          }
        }
      }
    });
    console.log(DocumentationCtrl);
  });
});
