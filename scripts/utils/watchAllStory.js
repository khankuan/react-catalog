import chokidar from 'chokidar'
import path from 'path'
import getFileName from './getFileName'
import writeIndex from './writeIndex'

export default async function watchAllStory ({ src, storyPattern, outputDir, storyExports }) {
  return await new Promise((resolve, reject) => {
    const watcher = chokidar.watch(storyPattern, {
      cwd: src,
      ignoreInitial: true
    })

    watcher.on('add', async function (file) {
      file = path.resolve(src, file)
      console.log('story_add', file)
      const name = getFileName(file)
      storyExports[name] = path.relative(outputDir, file)
      writeIndex({ index: 'stories', outputDir, exports: storyExports, exportAll: true })
    })

    watcher.on('unlink', async function (file) {
      file = path.resolve(src, file)
      console.log('story_remove', file)
      const name = getFileName(file)
      if (storyExports[name]) {
        delete storyExports[name]
        writeIndex({ index: 'stories', outputDir, exports: storyExports, exportAll: true })
      }
    })

    resolve(watcher)
  })
}
