/* eslint-env node, browser */

(function (factory) {
  "use strict";

  require("angular");

  factory(window.angular, require("markdown-it"), require("lodash"));
}(function factory(angular, MarkdownIt, _) {
  "use strict";

  document.querySelector("body").classList.remove("loading");

  angular.module("sop-doc", [])
    .provider("markdown", function () {
      return {
        $get: function () {
          return new MarkdownIt();
        }
      };
    })
    .config(function ($sceProvider) {
      $sceProvider.enabled(false);
    })
    .controller("DocumentationCtrl", require('./src/DocumentationCtrl'))
    .directive("documentation", function () {
      return {
        restrict: "E",
        controller: "DocumentationCtrl",
        controllerAs: "documentation"
      };
    })
    .directive("content", function () {
      return {
        restrict: "E",
        templateUrl: "content/index.html"
      };
    });
}));
