import { Story } from 'react-library'
import React from 'react'
import Card from './Card'

const story = new Story(Card)
export default story

const SampleContent = () => <div style={{ width: '200px', height: '100px' }}>My Content</div>

story.add({
  title: 'Low emphasis',
  description: 'The card has less contrast',
  content: { children: <SampleContent /> }
})

story.add({
  title: 'High emphasis',
  description: 'The card has more contrast and attention',
  content: <Card depth='2'><SampleContent /></Card>
})
