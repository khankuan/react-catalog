import webpack from 'webpack'
import path from 'path'
import makeWebpackConfig from './makeWebpackConfig'
const StatsPlugin = require("stats-webpack-plugin")

export default function makeWebpackDistConfig(opts) {
  const config = makeWebpackConfig(opts)
  const outputDistDir = path.resolve(process.cwd(), `${opts.outputPublicDir}/dist`)

  const { outputPublicDir } = opts
  config.output = {
    path: outputDistDir,
    filename: '[name].js',
    libraryTarget: 'umd',
  }

  config.entry = {
    lib: config.entry.components,
  }

  config.plugins = config.plugins.filter(plugin =>
    !(plugin.constructor === webpack.optimize.CommonsChunkPlugin && plugin.chunkNames === 'lib') &&
    !(plugin.constructor === webpack.optimize.CommonsChunkPlugin && plugin.chunkNames === 'vendor')
  )

  config.externals = {
    ...(config.externals || {}),
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  }

    config.profile = true
    config.plugins.push(
      new StatsPlugin('stats.json', {
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true,
        cached: true,
        reasons: true
      })
    )

  return config
}
