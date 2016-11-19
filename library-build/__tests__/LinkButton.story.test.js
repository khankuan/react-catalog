
import React from 'react'
import renderer from 'react-test-renderer'
import story from '../../docs/src/LinkButton/LinkButton.story.js'
import { Story } from 'react-library'

jest.useFakeTimers()

story.stories.forEach(s => {
  if (s.sequence) {
    const Component = story.type
    let props = Story.getSequenceInitialProps(s)
    let ref
    const node = renderer.create(<Component {...props} ref={_ref => (ref = _ref)} />)
    s.sequence.forEach(async function(step, i) {
      it(`LinkButton.story - ${s.title} - ${step.title}`, async () => {
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
    } else {
      const Component = story.type
      node = <Component {...s.content} />
    }
    it(`LinkButton.story - ${s.title}`, () => {
      expect(renderer.create(node)).toMatchSnapshot()
    })
  }
})
