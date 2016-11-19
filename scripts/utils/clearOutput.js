import rimraf from 'rimraf'

export default async function ({ outputDir, opts = {} }) {
  return new Promise((resolve, reject) => {
    rimraf(outputDir, opts, (error) => {
      error ? reject(error) : resolve()
    })
  })
}
