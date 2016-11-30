'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processDescription;
var tagsRegex = /@tags:(.*)/i;
var keywordsRegex = /@keywords:(.*)/i;
var defaultRegex = /@default/i;

function processDescription(inputDescription) {
  var tags = void 0,
      keywords = void 0,
      description = void 0,
      hasDefault = void 0;

  //  Find tags
  var tagMatches = inputDescription.match(tagsRegex);
  if (tagMatches) {
    tags = tagMatches[1].trim().split(',').map(function (t) {
      return t.trim();
    }).filter(function (t) {
      return !!t;
    });
  }

  //  Find keywords
  var keywordMatches = inputDescription.match(keywordsRegex);
  if (keywordMatches) {
    keywords = keywordMatches[1].trim().split(',').map(function (k) {
      return k.trim();
    }).filter(function (k) {
      return !!k;
    });
  }

  //  Check default
  var defaultMatch = inputDescription.match(defaultRegex);
  if (defaultMatch) {
    hasDefault = true;
  }

  //  Process description
  description = inputDescription.replace(tagsRegex, '').replace(keywordsRegex, '').replace(defaultRegex, '').trim();

  return { tags: tags, keywords: keywords, description: description, hasDefault: hasDefault };
}