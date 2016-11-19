import path from 'path'
import * as child from 'child_process'

export default async function lint ({ src }, { fix } = {}) {
  src = path.resolve(process.cwd(), src)
  fix = fix ? ' --fix' : ''

  return new Promise((resolve, reject) => {
    child.ChildProcess = child.exec(`standard ${src}/**/*${fix}`, (err, stdout, stderr) => {
      if (err) {
        reject(stdout)
      } else if (stderr) {
        reject(stderr)
      } else {
        resolve(stdout)
      }
    })
  })
}
