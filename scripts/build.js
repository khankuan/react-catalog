import chalk from 'chalk'
import clearOutput from './utils/clearOutput'
import generateAssets from './utils/generateAssets'
import generateComponentIndexAndDocs from './utils/generateComponentIndexAndDocs'
import generateStoryIndex from './utils/generateStoryIndex'
import generateConfig from './utils/generateConfig'
import startWebpackProd from './utils/startWebpackProd'
import transpile from './utils/transpile'
import makeWebpackConfig from './config/makeWebpackConfig'
import makeWebpackDistConfig from './config/makeWebpackDistConfig'

export default async function build ({ src, pagesDir, assets, outputDir, head, body, title,
  componentPattern, storyPattern, configureWebpack, postBuild }) {
  await clearOutput({ outputDir })
  console.log(chalk.green('Folder reset.'))

  await generateAssets({ outputDir, assets, head, body, production: true })
  console.log(chalk.green('Assets generated.'))

  //  Generate docs and story index
  await generateComponentIndexAndDocs({ src, componentPattern, storyPattern, outputDir, production: true })
  console.log(chalk.green('Component docs generated.'))
  generateStoryIndex({ src, storyPattern, outputDir })
  console.log(chalk.green('Stories generated.'))

  //  Generate config file
  await generateConfig({ outputDir, title, pagesDir })
  console.log(chalk.green('Config generated.'))

  //  Start build and server
  const outputPublicDir = `${outputDir}/public`
  const configOpts = {
    src,
    outputDir,
    outputPublicDir,
    pagesDir,
    configureWebpack,
    production: true,
  }
  const webpackConfig = makeWebpackConfig(configOpts)
  await startWebpackProd({ webpackConfig })
  console.log(chalk.green('Bundle built.'))

  const webpackDistConfig = makeWebpackDistConfig(configOpts)
  await startWebpackProd({ webpackConfig: webpackDistConfig })
  console.log(chalk.green('Dist built.'))

  if (postBuild) {
    await postBuild()
    console.log(chalk.green('Post build completed.'))
  }
}
