#!/usr/bin/env node
var spawn = require('cross-spawn')
var result = spawn.sync(
  'babel-node',
  [require.resolve('../dist/index.js')].concat(process.argv.slice(2)),
  {stdio: 'inherit'}
)
process.exit(result.status)
