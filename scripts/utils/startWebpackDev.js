import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'

export default async function webpackDev ({ webpackConfig, outputDir, port }) {
  webpackConfig.entry.app.unshift(
    require.resolve('webpack-dev-server/client') + `?http://localhost:${port}/`,
    require.resolve('webpack/hot/dev-server')
  )
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, {
    contentBase: outputDir,
    hot: true,
    stats: {
      hash: false,
      version: false,
      assets: false,
      modules: false,
      chunkModules: false,
      source: false,
      colors: true,
      chunk: false,
      children: false,
      chunkOrigins: false
    }
  })
  server.listen(port)
  return server
}
