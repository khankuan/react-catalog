'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var run = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var conf;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            conf = (0, _config2.default)(_commander2.default.config);

            //  Build or start

            if (!_commander2.default.test) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return (0, _test2.default)(conf, { update: _commander2.default.update });

          case 4:
            _context.next = 31;
            break;

          case 6:
            if (!_commander2.default.build) {
              _context.next = 11;
              break;
            }

            _context.next = 9;
            return (0, _build2.default)(conf);

          case 9:
            _context.next = 31;
            break;

          case 11:
            if (!_commander2.default.publish) {
              _context.next = 16;
              break;
            }

            _context.next = 14;
            return (0, _publish2.default)(conf);

          case 14:
            _context.next = 31;
            break;

          case 16:
            if (!_commander2.default.lint) {
              _context.next = 29;
              break;
            }

            _context.prev = 17;
            _context.next = 20;
            return (0, _lint2.default)(conf, { fix: _commander2.default.fix });

          case 20:
            _context.next = 27;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context['catch'](17);

            console.error(_chalk2.default.red(_context.t0));
            console.error(_chalk2.default.red('standard: Use JavaScript Standard Style (http://standardjs.com)'));
            console.error(_chalk2.default.red('Run again with --fix` to automatically fix some problems.'));

          case 27:
            _context.next = 31;
            break;

          case 29:
            _context.next = 31;
            return (0, _start2.default)(conf);

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[17, 22]]);
  }));

  return function run() {
    return _ref.apply(this, arguments);
  };
}();

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _start = require('./start');

var _start2 = _interopRequireDefault(_start);

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

var _publish = require('./publish');

var _publish2 = _interopRequireDefault(_publish);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

var _lint = require('./lint');

var _lint2 = _interopRequireDefault(_lint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  Script
_commander2.default.version(_package2.default.version).option('-c, --config <path>', 'Config file path').option('-b, --build', 'Build docs').option('-t, --test', 'Run test').option('-p, --publish', 'Publish to gh-pages').option('-u, --update', 'Run test and update').option('-l, --lint', 'Lint code').option('-f, --fix', 'Lint code and fix').parse(process.argv);

run().catch(function (err) {
  console.error(_chalk2.default.red('Error starting', err.stack || err));
  process.exit(1);
});