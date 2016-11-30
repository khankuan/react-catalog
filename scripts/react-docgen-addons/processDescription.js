const tagsRegex = /@tags:(.*)/i
const keywordsRegex = /@keywords:(.*)/i
const defaultRegex = /@default/i

export default function processDescription (inputDescription) {
  let tags, keywords, description, hasDefault

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

  //  Process description
  description = inputDescription
    .replace(tagsRegex, '')
    .replace(keywordsRegex, '')
    .replace(defaultRegex, '')
    .trim()

  return { tags, keywords, description, hasDefault }
}
