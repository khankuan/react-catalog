const categoriesRegex = /@categories:(.*)/i
const tagsRegex = /@tags:(.*)/i
const defaultRegex = /@default/i
const ignoreRegex = /@ignore/i

export default function processDescription (inputDescription) {
  let categories, tags, description, hasDefault, ignore

  //  Find categories
  const categoryMatches = inputDescription.match(categoriesRegex)
  if (categoryMatches) {
    categories = categoryMatches[1].trim().split(',').map(t => t.trim()).filter(t => !!t)
  }

  //  Find tags
  const tagMatches = inputDescription.match(tagsRegex)
  if (tagMatches) {
    tags = tagMatches[1].trim().split(',').map(k => k.trim()).filter(k => !!k)
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
    .replace(categoriesRegex, '')
    .replace(tagsRegex, '')
    .replace(defaultRegex, '')
    .replace(ignoreRegex, '')
    .trim()

  return { categories, tags, description, hasDefault, ignore }
}
