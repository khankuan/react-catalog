import path from 'path'

export default function getFileName (filePath) {
  return path.basename(filePath).replace(/\.[^/.]+$/, '')
}
