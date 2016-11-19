import glob from 'glob'
import path from 'path'
import Promise from 'bluebird'
import writeIndex from './writeIndex'
import getFileName from './getFileName'

export default async function generateAllComponentDoc ({ src, storyPattern, outputDir }) {
  const globPromise = Promise.promisify(glob)
  const files = await globPromise(storyPattern, {
    cwd: src
  })

  const exports = {}
  files.forEach(f => (exports[getFileName(f)] = path.relative(outputDir, `./${src}/${f}`)))
  await writeIndex({ index: 'stories', exports, outputDir })
  return exports
}
