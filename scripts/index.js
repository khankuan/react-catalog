import program from 'commander'
import chalk from 'chalk'
import packageJson from '../package.json'
import config from './config'
import start from './start'
import build from './build'
import publish from './publish'
import test from './test'
import lint from './lint'

//  Script
program
  .version(packageJson.version)
  .option('-c, --config <path>', 'Config file path')
  .option('-b, --build', 'Build docs')
  .option('-t, --test', 'Run test')
  .option('-p, --publish', 'Publish to gh-pages')
  .option('-u, --update', 'Run test and update')
  .option('-l, --lint', 'Lint code')
  .option('-f, --fix', 'Lint code and fix')
  .parse(process.argv)

async function run () {
  const conf = config(program.config)

  //  Build or start
  if (program.test) {
    await test(conf, { update: program.update })
  } else if (program.build) {
    await build(conf)
  } else if (program.publish) {
    await publish(conf)
  } else if (program.lint) {
    try {
      await lint(conf, { fix: program.fix })
    } catch (err) {
      console.error(chalk.red(err))
      console.error(chalk.red('standard: Use JavaScript Standard Style (http://standardjs.com)'))
      console.error(chalk.red('Run again with --fix` to automatically fix some problems.'))
    }
  } else {
    await start(conf)
  }
}

run().catch(err => {
  console.error(chalk.red('Error starting', err.stack || err))
  process.exit(1)
})
