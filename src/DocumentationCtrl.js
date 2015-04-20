function DocumentationCtrl($http, markdown) {
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
}

module.exports = DocumentationCtrl;
