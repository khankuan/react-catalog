import path from 'path'
import fs from 'fs'
import writeFile from './writeFile'

export default async function generateConfig ({ outputDir, title, pagesDir }) {
  const config = {
    title
  }
  pagesDir = path.resolve(process.cwd(), pagesDir)

  let data = [`export default ${JSON.stringify(config)}`]
  if (fs.existsSync(pagesDir)) {
    data.push(`export { default as pages } from '${path.relative(outputDir, pagesDir)}'`)
  }

  await writeFile({ outputPath: `${outputDir}/config.js`, data: data.join('\n') })
}
