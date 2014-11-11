(function (factory) {
  var jsyaml = require('js-yaml');

  require('angular');

  factory(window.angular, jsyaml);
}(function factory (angular, jsyaml) {
  document.querySelector('body').classList.remove("loading");

  angular.module('sop-doc', [])
    .directive('content', function ($http) {
      return {
        restrict: 'E',
        link: function (scope, element) {
          $http.get('config.yaml')
            .success(function (configYaml) {
              var parts = [];

              jsyaml.safeLoadAll(configYaml, function (config) {
                parts.push(config);
              });
              element.html(parts[1]);
            });
        }
      };
    });
}));

