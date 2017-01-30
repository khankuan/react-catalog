'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transpile;

var _child_process = require('child_process');

function transpile(_ref) {
  var src = _ref.src,
      outputDir = _ref.outputDir,
      storyPattern = _ref.storyPattern;

  (0, _child_process.execSync)('babel ' + src + ' -d ' + outputDir + '/lib --copy-files --ignore ./' + storyPattern);
}