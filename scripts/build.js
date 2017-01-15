import chalk from 'chalk'
import clearOutput from './utils/clearOutput'
import generateAssets from './utils/generateAssets'
import generateComponentIndexAndDocs from './utils/generateComponentIndexAndDocs'
import generateStoryIndex from './utils/generateStoryIndex'
import generateConfig from './utils/generateConfig'
import startWebpackProd from './utils/startWebpackProd'
import transpile from './utils/transpile'
import makeWebpackConfig from './config/makeWebpackConfig'

export default async function build ({ src, pagesDir, assets, outputDir, head, body, title,
  componentPattern, storyPattern, configureWebpack, postBuild }) {
  await clearOutput({ outputDir: `${outputDir}/!(__tests__)` })
  console.log(chalk.green('Folder reset.'))

  await generateAssets({ outputDir, assets, head, body, production: true })
  console.log(chalk.green('Assets generated.'))

  //  Transpile to lib
  await transpile({ src, outputDir, storyPattern })
  console.log(chalk.green('Src transpiled'))

  //  Generate component index, docs and story index
  await generateComponentIndexAndDocs({ src, componentPattern, storyPattern, outputDir, production: true })
  console.log(chalk.green('Component docs generated.'))
  generateStoryIndex({ src, storyPattern, outputDir })
  console.log(chalk.green('Stories generated.'))

  //  Generate config file
  await generateConfig({ outputDir, title, pagesDir })
  console.log(chalk.green('Config generated.'))

  //  Start build and server
  const outputPublicDir = `${outputDir}/public`
  const webpackConfig = makeWebpackConfig({
    src,
    outputDir,
    outputPublicDir,
    pagesDir,
    configureWebpack,
    production: true,
  })

  await startWebpackProd({ webpackConfig, outputDir: outputPublicDir })
  console.log(chalk.green('Bundle built.'))

  if (postBuild) {
    await postBuild()
    console.log(chalk.green('Post build completed.'))
  }
}
