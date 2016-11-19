'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _history = require('history');

exports.default = (0, _reactRouter.useRouterHistory)(_history.createHashHistory)({ queryKey: false });