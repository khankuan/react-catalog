import { execSync } from 'child_process'

export default function transpile({ src, outputDir, storyPattern }) {
  execSync(`babel ${src} -d ${outputDir}/lib --copy-files --ignore ./${storyPattern}`)
}
