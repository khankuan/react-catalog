import chalk from 'chalk'
import clearOutput from './utils/clearOutput'
import generateAssets from './utils/generateAssets'
import generateComponentIndexAndDocs from './utils/generateComponentIndexAndDocs'
import generateStoryIndex from './utils/generateStoryIndex'
import generateConfig from './utils/generateConfig'
import watchAllComponentDoc from './utils/watchAllComponentDoc'
import watchAllStory from './utils/watchAllStory'
import startWebpackDev from './utils/startWebpackDev'
import makeWebpackConfig from './config/makeWebpackConfig'

export default async function start ({ src, pagesDir, assets, outputDir, head, body, title,
  componentPattern, storyPattern, configureWebpack, postBuild, port }) {
  await clearOutput({ outputDir })
  console.log(chalk.green('Folder reset.'))

  await generateAssets({ outputDir, assets, head, body })
  console.log(chalk.green('Assets generated.'))

  //  Generate component index, docs and story index
  const componentExports = await generateComponentIndexAndDocs({ src, componentPattern, storyPattern, outputDir })
  console.log(chalk.green('Component docs generated.'))
  const storyExports = await generateStoryIndex({ src, storyPattern, outputDir })
  console.log(chalk.green('Stories generated.'))

  //  Generate config file
  await generateConfig({ outputDir, title, pagesDir })
  console.log(chalk.green('Config generated.'))

  //  Watch folder for component and story files
  await watchAllComponentDoc({ src, componentPattern, storyPattern, outputDir, componentExports })
  await watchAllStory({ src, storyPattern, outputDir, storyExports })
  console.log(chalk.green('Begin watching files..'))

  //  Start build and server
  const outputPublicDir = `${outputDir}/public`
  const webpackConfig = makeWebpackConfig({ src, outputDir, outputPublicDir, pagesDir, configureWebpack })
  await startWebpackDev({ webpackConfig, outputDir: outputPublicDir, port })
  console.log(chalk.green(`Server started at http://localhost:${port}`))

  if (postBuild) {
    await postBuild({ dev: true })
    console.log(chalk.green('Post build completed.'))
  }
}
