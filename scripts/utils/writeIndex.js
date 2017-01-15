import writeFile from './writeFile'

const regExp = new RegExp('^[a-zA-Z0-9]+')

export default async function writeIndex ({ index, exports, outputDir, es5 }) {
  const data = Object.keys(exports)
    .map(name => ({
      name,
      exportName: name.match(regExp)[0]
    }))
    .sort((a, b) => (a.exportName - b.exportName))
    .map(({ name, exportName }) => es5 ?
      `exports['${exportName}'] = require('${exports[name]}')` :
      `export { default as ${exportName} } from '${exports[name]}'`)
    .join('\n') + '\n'
  await writeFile({ outputPath: `${outputDir}/${index}.js`, data })
}
