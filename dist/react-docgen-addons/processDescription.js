'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processDescription;
var categoriesRegex = /@categories:(.*)/i;
var tagsRegex = /@tags:(.*)/i;
var defaultRegex = /@default/i;
var ignoreRegex = /@ignore/i;

function processDescription(inputDescription) {
  var categories = void 0,
      tags = void 0,
      description = void 0,
      hasDefault = void 0,
      ignore = void 0;

  //  Find categories
  var categoryMatches = inputDescription.match(categoriesRegex);
  if (categoryMatches) {
    categories = categoryMatches[1].trim().split(',').map(function (t) {
      return t.trim();
    }).filter(function (t) {
      return !!t;
    });
  }

  //  Find tags
  var tagMatches = inputDescription.match(tagsRegex);
  if (tagMatches) {
    tags = tagMatches[1].trim().split(',').map(function (k) {
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

  //  Check ignore
  var ignoreMatch = inputDescription.match(ignoreRegex);
  if (ignoreMatch) {
    ignore = true;
  }

  //  Process description
  description = inputDescription.replace(categoriesRegex, '').replace(tagsRegex, '').replace(defaultRegex, '').replace(ignoreRegex, '').trim();

  return { categories: categories, tags: tags, description: description, hasDefault: hasDefault, ignore: ignore };
}