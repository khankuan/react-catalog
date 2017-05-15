
process.traceDeprecation = true;
import path from 'path'
import webpack from 'webpack'
import babelDev from './babel.dev'
import babelProd from './babel.prod'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const commonPlugins = [
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

const extractCatalogCss = new ExtractTextPlugin({ filename: 'catalog.css' })
const extractSourceCss = new ExtractTextPlugin({ filename: 'lib.css' })
const extractPagesCss = new ExtractTextPlugin({ filename: 'pages.css' })
const prodPlugins = [
  ...commonPlugins,
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true, // React doesn't support IE8
      warnings: false
    },
    mangle: false,
    output: {
      comments: false,
      screw_ie8: true
    }
  }),
  extractCatalogCss,
  extractSourceCss,
  extractPagesCss,
];

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
  },
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      autoprefixer({
        browsers: ['last 2 version']
      }),
    ],
  },
}

export default function makeWebpackConfig ({ outputDir, outputPublicDir, src, pagesDir, configureWebpack, production }) {
  const catalogSrc = path.resolve(__dirname, '../../src')
  const srcSrc = path.resolve(process.cwd(), src)
  const pagesSrc = pagesDir ? path.resolve(process.cwd(), pagesDir) : null
  outputDir = path.resolve(process.cwd(), outputDir)
  outputPublicDir = path.resolve(process.cwd(), outputPublicDir)

  let output = {
    entry: {
      app: ['babel-polyfill', path.resolve(catalogSrc, './app/index.js')],
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
      ],
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
            catalogSrc,
            outputDir,
            pagesSrc
          ],
        },
        {
          test: /\.css$/,
          include: [
            catalogSrc,
            outputDir,
            /node_modules/,
          ],
          use: production ? extractCatalogCss.extract({
            use: [cssLoader, postCssLoader],
          }) : ['style-loader', cssLoader, postCssLoader],
        },
        {
          test: /\.css$/,
          include: [
            srcSrc,
          ],
          use: production ? extractSourceCss.extract({
            use: [cssLoader, postCssLoader],
          }) : ['style-loader', cssLoader, postCssLoader],
        },
        {
          test: /\.css$/,
          include: [
            pagesSrc,
          ],
          use: production ? extractPagesCss.extract({
            use: [cssLoader, postCssLoader],
          }) : ['style-loader', cssLoader, postCssLoader],
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
        'react-catalog': catalogSrc
      }
    },
    plugins: [
      ...(production ? prodPlugins : devPlugins)
    ],
    devtool: production ? 'source-map' : 'cheap-module-source-map',
  }

  if (configureWebpack) {
    return configureWebpack(output, production)
  }
  return output
}
