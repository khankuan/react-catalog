import path from 'path'
import webpack from 'webpack'
import babelDev from './babel.dev'
import babelProd from './babel.prod'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const commonPlugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: ['last 2 version']
        })
      ],
      context: process.cwd(),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'lib',
    chunks: ['components', 'app'],
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: ['vendor', 'lib', 'app'],
  }),
]

const devPlugins = [
  ...commonPlugins,
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
]

const extractLibraryCss = new ExtractTextPlugin({ filename: 'library.css', allChunks: true })
const extractSourceCss = new ExtractTextPlugin({ filename: 'lib.css' })
const prodPlugins = [
  ...commonPlugins,
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
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
];

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
  },
}

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
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: production ? babelProd : babelDev
            },
          ],
          include: [
            srcSrc,
            librarySrc,
            outputDir,
            pagesSrc
          ],
        },
        {
          test: /\.css$/,
          include: [
            srcSrc,
          ],
          loader: production ? extractSourceCss.extract({
            loader: [cssLoader, 'postcss-loader'],
          }) : undefined,
          use: production ? undefined : ['style-loader', cssLoader, 'postcss-loader'],
        },
        {
          test: /\.css$/,
          include: [
            pagesSrc,
            librarySrc,
            outputDir,
            /node_modules/,
          ],
          loader: production ? extractLibraryCss.extract({
            loader: [cssLoader, 'postcss-loader'],
          }) : undefined,
          use: production ? undefined : ['style-loader', cssLoader, 'postcss-loader'],
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
          use: {
            loader: 'url-loader',
            options: { limit: 10000 },
          },
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        },
        {
          test: /\.md$/,
          use: ['html-loader', 'markdown-loader'],
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.html', '.md', '.json'],
      modules: ['node_modules'],
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
