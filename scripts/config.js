import path from 'path'
import fs from 'fs'

export default function (configPath) {
  //  Default config
  let config = {
    src: 'src',
    pagesDir: 'src/pages',
    outputDir: 'library-build',
    assets: [],
    title: 'React Library',
    componentPattern: '**/*.jsx',
    storyPattern: '**/*.story.jsx',
    configureWebpack: null,
    postBuild: null,
    port: 9000
  }

  const configFile = path.resolve(process.cwd() + '/', configPath || 'library.config.js')

  if (!fs.existsSync(configFile)) {
    return config
  }

  try {
    const data = require(configFile).default || require(configFile) //  support module.exports
    config = {
      ...config,
      ...data
    }
  } catch (err) {
    throw new Error('Error loading config ' + (err.stack || err))
  }
  return config
}
