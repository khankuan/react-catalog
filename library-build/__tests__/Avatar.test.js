
import React from 'react'
import Avatar from '../../docs/src/Avatar/Avatar.jsx'
import ReactTestUtils from 'react-addons-test-utils'
it('Avatar default renders', () => {
  expect(ReactTestUtils.createRenderer().render(<Avatar />)).toMatchSnapshot();
})
  