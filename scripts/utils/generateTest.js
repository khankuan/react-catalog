export function generateDefaultTest ({ data, it, name, componentPath }) {
  const test = `
import React from 'react'
import ${name} from '${componentPath}'
import ReactTestUtils from 'react-addons-test-utils'
it('${it}', () => {
  expect(ReactTestUtils.createRenderer().render(${data})).toMatchSnapshot();
})
  `
  return test
}

export function generateStoriesTest ({ importedPath, name }) {
  const test = `
import React from 'react'
import renderer from 'react-test-renderer'
import story from '${importedPath}'
import { Story } from 'react-gallery'

jest.useFakeTimers()

const stories = story.stories.filter(s => !s.skipTest)
stories
  .forEach(s => {
    if (s.sequence) {
      const Component = story.type
      let props = Story.getSequenceInitialProps(s)
      let ref
      const node = renderer.create(<Component {...props} ref={_ref => (ref = _ref)} />)
      s.sequence.forEach(async function(step, i) {
        it(\`${name} - $\{s.title\}\ - $\{step.title\}\`, async () => {
          if (i > 0) {
            const result = Story.getSequenceStepProps(ref, s, i, props)
            jest.runAllTimers()
            props = await result
            node.update(<Component {...props} ref={_ref => (ref = _ref)} />)
          }
          const tree = node.toJSON()
          expect(tree).toMatchSnapshot()
          expect(story.popHandleCalls()).toMatchSnapshot()
        })
      })
    } else {
      let node
      if (React.isValidElement(s.content)) {
        node = s.content
      } else if (Array.isArray(s.content)) {
        node = <div>{React.Children.map(s.content, (child, i) => React.cloneElement(child, { key: i }))}</div>
      } else {
        const Component = story.type
        node = <Component {...s.content} />
      }
      it(\`${name} - $\{s.title\}\`, () => {
        expect(renderer.create(node)).toMatchSnapshot()
      })
    }
  })
  if (stories.length === 0) {
    it(\`${name} - No stories\`, () => {
    });
  }
`
  return test
}
