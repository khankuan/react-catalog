import ncp from 'ncp'
import fs from 'fs'
import mkdirp from 'mkdirp'
import Promise from 'bluebird'
import writeFile from './writeFile'
import generateIndexHtml from './generateIndexHtml'

export default async function generateAssets ({ outputDir, assets, head, body, production }) {
  if (assets && !Array.isArray(assets)) {
    assets = [assets]
  }
  const outputPublicDir = `${outputDir}/public`
  if (!fs.existsSync(outputPublicDir)) {
    mkdirp.sync(outputPublicDir)
  }

  await writeFile({ outputPath: `${outputPublicDir}/index.html`, data: generateIndexHtml({ head, body, production }) })

  const copy = Promise.promisify(ncp.ncp)
  return await Promise.all(assets.map(asset =>
    (asset.src && fs.existsSync(asset.src)) ? copy(asset.src, `${outputPublicDir}${asset.dest || ''}`) : Promise.resolve()
  ))
}
