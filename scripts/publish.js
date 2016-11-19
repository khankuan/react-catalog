import ghpages from 'gh-pages'
import path from 'path'

export default async function publish ({ outputDir }) {
  const outputPublicDir = `${outputDir}/public`
  return new Promise((resolve, reject) => {
    ghpages.publish(path.resolve(process.cwd(), outputPublicDir), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
