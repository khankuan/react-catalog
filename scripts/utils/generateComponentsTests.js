import glob from 'glob'
import path from 'path'
import Promise from 'bluebird'
import { parseComponentDoc } from './generateComponentDoc'
import { generateDefaultTest, generateStoriesTest } from './generateTest'
import getFileName from './getFileName'
import writeFile from './writeFile'
import clearOutput from './clearOutput'

const globPromise = Promise.promisify(glob)

export async function getDoc ({ inputPath }) {
  try {
    return await parseComponentDoc({ inputPath })
  } catch (err) {
    return null
  }
}

export async function generateComponentsDefaultTests ({ src, componentPattern, storyPattern, outputDir }) {
  const files = await globPromise(componentPattern, {
    cwd: src,
    ignore: storyPattern
  })

  //  Default tests
  await Promise.all(files.map(f => {
    const inputPath = path.resolve(src + '/', f)
    return getDoc({ inputPath })
      .then(doc => {
        if (doc && doc.hasDefault) {
          const name = getFileName(f)
          const outputPath = path.relative(process.cwd(), path.resolve(outputDir, `./${name}.test.js`))
          const data = generateDefaultTest({
            data: `<${name} />`,
            it: `${name} default renders`,
            componentPath: path.relative(outputDir, inputPath),
            name
          })
          return writeFile({ outputPath, data })
        }
      })
  }))
}

export async function generateComponentsStoryTests ({ src, storyPattern, outputDir }) {
  const files = await globPromise(storyPattern, {
    cwd: src
  })

  //  Default tests
  await Promise.all(files.map(f => {
    const inputPath = path.resolve(src + '/', f)
    const name = getFileName(f).split()
    const outputPath = path.relative(process.cwd(), path.resolve(outputDir, `./${name}.test.js`))
    const data = generateStoriesTest({
      importedPath: path.relative(outputDir, inputPath),
      name
    })
    writeFile({ outputPath, data })
  }))
}

export async function clearOldTests ({ outputDir }) {
  return await clearOutput({ outputDir: `${outputDir}/!(__snapshots__)` })
}

export default async function generateComponentsTests ({ src, componentPattern, storyPattern, outputDir }) {
  await clearOldTests({ outputDir })
  await generateComponentsDefaultTests({ src, componentPattern, storyPattern, outputDir })
  await generateComponentsStoryTests({ src, componentPattern, storyPattern, outputDir })
}
