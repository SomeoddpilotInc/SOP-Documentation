(function (factory) {
  var jsyaml = require('js-yaml');
  var marked = require("marked");
  var _ = require('lodash');

  require('angular');

  factory(window.angular, jsyaml, marked, _);
}(function factory (angular, jsyaml, marked, _) {
  document.querySelector('body').classList.remove("loading");

  angular.module('sop-doc', [])
    .provider('jsyaml', function () {
      return {
        $get: function () {
          return jsyaml;
        }
      };
    })
    .provider('marked', function () {
      return {
        $get: function () {
          return marked;
        }
      };
    })
    .config(function ($sceProvider) {
      $sceProvider.enabled(false);
    })
    .controller('DocumentationCtrl', function ($http, marked) {
      var _this = this;

      $http.get("content.md")
        .success(function (contentMd) {
          var items = angular.element(marked(contentMd));

          _this.content = marked(contentMd);

          var matches = _this.content.match(/h2 id="([a-z-]+)">(.*)</g);

          _this.chapters = _.map(matches, function (element) {
            var elementParts = element.match(/h2 id="([a-z-]+)">(.*)</);
            return {
              url: elementParts[1],
              title: elementParts[2]
            };
          });
        })
        .error(function () {
          _this.content = "Please put your documentation in <code>content.md</code>. You can see an example file in <code>content.md.example</code>.";
        });
    })
    .directive('documentation', function () {
      return {
        restrict: 'E',
        controller: 'DocumentationCtrl',
        controllerAs: 'documentation'
      };
    })
    .controller('ContentCtrl', function ($http, marked, jsyaml) {
      var _this = this;

      $http.get('config.yaml')
        .success(function (configYaml) {
          var config = jsyaml.safeLoad(configYaml);

          _this.title = config.title;
        })
        .error(function () {
          _this.title = '';
        });

    })
    .directive('content', function () {
      return {
        restrict: 'E',
        templateUrl: 'content/index.html',
        controller: "ContentCtrl",
        controllerAs: "content"
      };
    });
}));

