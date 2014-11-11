(function (factory) {
  var jsyaml = require('js-yaml');
  var marked = require("marked");

  require('angular');

  factory(window.angular, jsyaml, marked);
}(function factory (angular, jsyaml, marked) {
  document.querySelector('body').classList.remove("loading");

  angular.module('sop-doc', [])
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
    .directive('content', function ($http, marked) {
      return {
        restrict: 'E',
        templateUrl: 'content/index.html',
        controller: function () {
          var _this = this;

          $http.get('config.yaml')
            .success(function (configYaml) {
              var config = jsyaml.safeLoad(configYaml);

              _this.title = config.title;
            })
            .error(function () {
              _this.title = '';
            });

          $http.get("content.md")
            .success(function (contentMd) {
              _this.content = marked(contentMd);
            })
            .error(function () {
              _this.content = "Please put your documentation in <code>content.md</code>. You can see an example file in <code>content.md.example</code>.";
            });
        },
        controllerAs: "content"
      };
    });
}));

