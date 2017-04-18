import webpack from 'webpack'

export default async function webpackProd ({ webpackConfig }) {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err)
      } else if (stats.hasErrors()) {
        const info = stats.toJson();
        reject(info.errors)
      } else {
        resolve()
      }
    })
  })
}
