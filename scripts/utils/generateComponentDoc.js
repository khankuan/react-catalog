import fs from 'fs'
import Promise from 'bluebird'
import writeFile from './writeFile'
import { parse as parseComponent, defaultHandlers } from 'react-docgen'
import componentDependencyHandler from '../react-docgen-addons/componentDependencyHandler'
import processDescription from '../react-docgen-addons/processDescription'
import hasDefault from '../react-docgen-addons/hasDefault'
import getFileName from './getFileName'

const readFile = Promise.promisify(fs.readFile)

export async function parseComponentDoc ({ inputPath }) {
  const data = await readFile(inputPath, 'utf8')
  let doc = parseComponent(data, null, [...defaultHandlers, componentDependencyHandler])
  const componentName = getFileName(inputPath)
  doc.name = componentName
  if (doc.description) {
    doc = { ...doc, ...processDescription(doc.description) }
  }
  //  If default enabled, check for required propTypes
  if (doc.props && doc.hasDefault) {
    doc.hasDefault = hasDefault(doc.props)
  }
  if (doc.ignore) {
    throw new Error('IGNORED')
  }
  return doc
}

export default async function generateComponentDoc ({ inputPath, outputDir }) {
  let componentDoc = await parseComponentDoc({ inputPath })
  const outputPath = `${outputDir}/${componentDoc.name}.js`
  const data = `export default ${JSON.stringify(componentDoc, null, 2)}`
  try {
    const curData = await readFile(outputPath, 'utf8')
    if (curData === data) {
      return componentDoc.name
    }
  } catch (err) {}

  await writeFile({
    outputPath,
    data
  })
  return componentDoc.name
}
