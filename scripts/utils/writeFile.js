import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'

export default async function writeFile ({ outputPath, data }) {
  const dir = path.dirname(outputPath)

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir)
  }

  fs.writeFileSync(outputPath, data, 'utf8')
}
