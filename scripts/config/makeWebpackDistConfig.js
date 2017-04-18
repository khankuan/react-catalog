import webpack from 'webpack'
import makeWebpackConfig from './makeWebpackConfig'

export default function makeWebpackDistConfig(opts) {
  const config = makeWebpackConfig(opts)

  const { outputPublicDir } = opts
  config.output = {
    path: `${outputPublicDir}/dist`,
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
    ...(config.plugins.externals || {}),
    react: 'react',
    'react-dom': 'react-dom',
  }

  return config
}
