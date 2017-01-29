import chalk from 'chalk'
import { generateTranspiledIndex } from './utils/generateComponentIndexAndDocs'
import transpileSrc from './utils/transpile'

export default async function transpile ({ src, outputDir, componentPattern, storyPattern }) {
  //  Transpile to lib
  await transpileSrc({ src, outputDir, storyPattern })
  console.log(chalk.green('Src transpiled'))

  //  Generate component index
  await generateTranspiledIndex({ src, componentPattern, storyPattern, outputDir })
  console.log(chalk.green('Component index generated.'))
}
