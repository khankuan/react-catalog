'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var _ref$head = _ref.head,
      head = _ref$head === undefined ? '' : _ref$head,
      _ref$body = _ref.body,
      body = _ref$body === undefined ? '' : _ref$body,
      production = _ref.production;

  var html = '<!doctype html>\n<html class="no-js" lang="">\n\n<head>\n  <meta charset="utf-8">\n  ' + (production ? '<link href="library.css" rel="stylesheet" type="text/css">' : '') + '\n  ' + (typeof head === 'function' ? head(production) : head) + '\n</head>\n\n<body>\n  <div id=\'app\'></div>\n  <script src="vendor.js"></script>\n  <script src="app.js"></script>\n  ' + (typeof body === 'function' ? body(production) : body) + '\n</body>\n\n</html>';
  return html;
};