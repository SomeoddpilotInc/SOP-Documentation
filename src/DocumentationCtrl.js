/*@ngInject*/
function DocumentationCtrl($http, markdown) {
  $http.get("content.md")
    .success(this.success.bind(this, markdown))
    .error(this.error.bind(this));
}

DocumentationCtrl.prototype.success = function success(markdown, contentMd) {
  this.content = markdown.render(contentMd);

  var matches = self.content.match(/h2 id="([a-z-]+)">(.*)</g);

  self.chapters = _.map(matches, function mapChapters(element) {
    var elementParts = element.match(/h2 id="([a-z-]+)">(.*)</);
    return {
      url: elementParts[1],
      title: elementParts[2]
    };
  });
};

DocumentationCtrl.prototype.error = function error() {
  this.content = [
    "Please put your documentation in <code>content.md</code>.",
    "You can see an example file in <code>content.md.example</code>."
  ].join("");
};

module.exports = DocumentationCtrl;
