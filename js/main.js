/* eslint-env node, browser */

(function (factory) {
  "use strict";

  require("angular");

  factory(window.angular, require("markdown-it"), require("lodash"));
}(function factory (angular, MarkdownIt, _) {
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
    .controller("DocumentationCtrl", function ($http, markdown) {
      var self = this;

      $http.get("content.md")
        .success(function (contentMd) {
          self.content = markdown.render(contentMd);

          var matches = self.content.match(/h2 id="([a-z-]+)">(.*)</g);

          self.chapters = _.map(matches, function (element) {
            var elementParts = element.match(/h2 id="([a-z-]+)">(.*)</);
            return {
              url: elementParts[1],
              title: elementParts[2]
            };
          });
        })
        .error(function () {
          self.content = [
            "Please put your documentation in <code>content.md</code>.",
            "You can see an example file in <code>content.md.example</code>."
          ].join("");
        });
    })
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
