import chokidar from 'chokidar'
import path from 'path'
import fs from 'fs'
import generateComponentDoc from './generateComponentDoc'
import getFileName from './getFileName'
import writeIndex from './writeIndex'

export default async function watchAllComponentDoc ({ src, componentPattern, storyPattern, outputDir, componentExports }) {
  async function addComponentToIndex (name, file) {
    if (!componentExports.components[name]) {
      componentExports.components[name] = path.relative(outputDir, file)
      await writeIndex({ index: 'components', outputDir, exports: componentExports.components })
    }
    if (!componentExports.docs[name]) {
      componentExports.docs[name] = `./docs/${name}`
      await writeIndex({ index: 'docs', outputDir, exports: componentExports.docs })
    }
  }

  const docsDir = `${outputDir}/docs`
  return await new Promise((resolve, reject) => {
    const watcher = chokidar.watch(componentPattern, {
      ignored: storyPattern,
      cwd: src,
      ignoreInitial: true
    })

    watcher.on('add', async function (file) {
      file = path.resolve(src, file)
      console.log('component_add', file)
      const name = await generateComponentDoc({ inputPath: file, outputDir: docsDir })
      addComponentToIndex(name, file)
    })

    watcher.on('change', async function (file) {
      file = path.resolve(src, file)
      console.log('component_change', file)
      const name = await generateComponentDoc({ inputPath: file, outputDir: docsDir })
      addComponentToIndex(name, file)
    })

    watcher.on('unlink', async function (file) {
      file = path.resolve(src, file)
      console.log('component_remove', file)
      const name = getFileName(file)
      if (componentExports.components[name]) {
        delete componentExports.components[name]
        writeIndex({ index: 'components', outputDir, exports: componentExports.components })
      }
      if (componentExports.docs[name]) {
        delete componentExports.docs[name]
        writeIndex({ index: 'docs', outputDir, exports: componentExports.docs })
        fs.unlinkSync(`${docsDir}/${name}.js`)
      }
    })

    resolve(watcher)
  })
}
