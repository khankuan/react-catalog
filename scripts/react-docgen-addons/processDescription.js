const tagsRegex = /@tags:(.*)/i
const keywordsRegex = /@keywords:(.*)/i
const defaultRegex = /@default/i
const ignoreRegex = /@ignore/i

export default function processDescription (inputDescription) {
  let tags, keywords, description, hasDefault, ignore

  //  Find tags
  const tagMatches = inputDescription.match(tagsRegex)
  if (tagMatches) {
    tags = tagMatches[1].trim().split(',').map(t => t.trim()).filter(t => !!t)
  }

  //  Find keywords
  const keywordMatches = inputDescription.match(keywordsRegex)
  if (keywordMatches) {
    keywords = keywordMatches[1].trim().split(',').map(k => k.trim()).filter(k => !!k)
  }

  //  Check default
  const defaultMatch = inputDescription.match(defaultRegex)
  if (defaultMatch) {
    hasDefault = true
  }

  //  Check ignore
  const ignoreMatch = inputDescription.match(ignoreRegex)
  if (ignoreMatch) {
    ignore = true
  }

  //  Process description
  description = inputDescription
    .replace(tagsRegex, '')
    .replace(keywordsRegex, '')
    .replace(defaultRegex, '')
    .replace(ignoreRegex, '')
    .trim()

  return { tags, keywords, description, hasDefault, ignore }
}
