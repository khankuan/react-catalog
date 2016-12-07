import glob from 'glob'
import path from 'path'
import chalk from 'chalk'
import Promise from 'bluebird'
import generateComponentDoc from './generateComponentDoc'
import writeIndex from './writeIndex'

export async function generateComponentDocs ({ src, componentPattern, storyPattern, outputDir }) {
  const globPromise = Promise.promisify(glob)
  const files = await globPromise(componentPattern, {
    cwd: src,
    ignore: storyPattern
  })

  const docsDir = `${outputDir}/docs`
  const exports = {
    components: {},
    docs: {}
  }

  for (let i = 0; i < files.length; i++) {
    const f = files[i]
    await generateComponentDoc({ inputPath: path.resolve(src + '/', f), outputDir: docsDir })
      .then(name => {
        exports.components[name] = path.relative(outputDir, `./${src}/${f}`)
        exports.docs[name] = `./docs/${name}`
      })
      .catch(err => {
        if (err.message === 'IGNORED') {
          console.warn(chalk.yellow('Ignored:', f))
        } else if (err.message !== 'No suitable component definition found.') {
          return
        } else {
          console.warn(chalk.red('Error parsing file:', f, err.message))
        }
      })
  }

  return exports
}

export default async function generateComponentIndexAndDocs ({ src, componentPattern, storyPattern, outputDir }) {
  const exports = await generateComponentDocs({ src, componentPattern, storyPattern, outputDir })
  await writeIndex({ index: 'components', exports: exports.components, outputDir })
  await writeIndex({ index: 'docs', exports: exports.docs, outputDir })
  return exports
}
