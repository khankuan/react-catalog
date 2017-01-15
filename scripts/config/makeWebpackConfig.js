import path from 'path'
import webpack from 'webpack'
import babelDev from './babel.dev'
import babelProd from './babel.prod'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const commonPlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'index',
    chunks: ['components', 'app'],
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: ['vendor', 'index', 'app'],
  }),
]

const devPlugins = [
  ...commonPlugins,
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
]

const extractLibraryCss = new ExtractTextPlugin('library.css')
const extractSourceCss = new ExtractTextPlugin('index.css')
const prodPlugins = [
  ...commonPlugins,
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true, // React doesn't support IE8
      warnings: false
    },
    mangle: {
      screw_ie8: true
    },
    output: {
      comments: false,
      screw_ie8: true
    }
  }),
  extractLibraryCss,
  extractSourceCss,
]

export default function makeWebpackConfig ({ outputDir, outputPublicDir, src, pagesDir, configureWebpack, production }) {
  const librarySrc = path.resolve(__dirname, '../../src')
  const srcSrc = path.resolve(process.cwd(), src)
  const pagesSrc = pagesDir ? path.resolve(process.cwd(), pagesDir) : null
  outputDir = path.resolve(process.cwd(), outputDir)
  outputPublicDir = path.resolve(process.cwd(), outputPublicDir)

  let output = {
    entry: {
      app: ['babel-polyfill', path.resolve(librarySrc, './app/index.js')],
      vendor: [
        'react',
        'react-router',
        'react-dom',
        'history',
        'react-codemirror',
        'codemirror',
        'js-beautify',
        'react-element-to-jsx-string',
        'classnames',
        'react-markdown',
        'fuse.js',
        'react-document-title',
      ],
      components: [
        path.resolve(outputDir, './components.js'),
      ]
    },
    output: {
      path: outputPublicDir,
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          include: [
            srcSrc,
            librarySrc,
            outputDir,
            pagesSrc
          ],
          query: production ? babelProd : babelDev
        },
        {
          test: /\.css$/,
          include: [
            srcSrc,
            pagesSrc,
          ],
          loader: production ? extractSourceCss.extract('css!postcss') : 'style!css!postcss',
        },
        {
          test: /\.css$/,
          include: [
            librarySrc,
            outputDir,
            /node_modules/
          ],
          loader: production ? extractLibraryCss.extract('css!postcss') : 'style!css!postcss',
        },
        {
          test: /\.json$/, loader: 'json'
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
          loader: 'url?limit=10000'
        },
        {
          test: /\.html$/,
          loader: 'html'
        },
        {
          test: /\.md$/,
          loader: 'html!markdown'
        }
      ]
    },
    postcss: function () {
      return [autoprefixer]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.html', '.md', '.json'],
      modulesDirectories: ['node_modules'],
      alias: {
        build: outputDir,
        'react-library': librarySrc
      }
    },
    plugins: [
      ...(production ? prodPlugins : devPlugins)
    ],
    devtool: 'eval',
  }

  if (configureWebpack) {
    return configureWebpack(output, production)
  }
  return output
}
