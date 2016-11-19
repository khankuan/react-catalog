import webpack from 'webpack'

export default async function webpackProd ({ webpackConfig, outputDir, port }) {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
