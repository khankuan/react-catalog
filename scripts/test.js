import jest from 'jest'
import chalk from 'chalk'
import path from 'path'

import generateComponentsTests from './utils/generateComponentsTests'

export default async function test ({ src, componentPattern, storyPattern, testDir }, { update }) {
  const stub = path.resolve(__dirname, 'utils/stub.js')
  await generateComponentsTests({ src, componentPattern, storyPattern, outputDir: testDir })
  console.log(chalk.green('Tests generated.'))

  const jestConfig = {
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    transformIgnorePatterns: ['/node_modules(?!\/(react-library))/'],
    testRegex: '(__tests__/.*|\\.(test|spec))\\.js$',
    rootDir: testDir,
    moduleNameMapper: {
      '^[./a-zA-Z0-9$_-]+\\.(jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm)$': stub,
      '^[./a-zA-Z0-9$_-]+\\.(css|sass|scss)$': stub,
      'react-library': path.resolve(__dirname, '../src/index.js'),
      alert: () => {}
    }
  }

  console.log('Starting tests..')
  const args = ['--config', JSON.stringify(jestConfig)]
  if (update) {
    args.push('-u')
  }
  process.env.NODE_ENV = 'TEST'
  jest.run(args)
}
