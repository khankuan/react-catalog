import React, { PropTypes, Component } from 'react'

import SequenceControls from '../SequenceControls/SequenceControls'
import Sequencer from '../Sequencer/Sequencer'
import RenderSafe from '../RenderSafe/RenderSafe'

import './BrowseComponentSequence.css'

export default class BrowseComponentSequence extends Component {

  static propTypes = {
    story: PropTypes.shape({
      sequence: PropTypes.array
    }),
    component: PropTypes.string
  }

  state ={
    stepIndex: 0
  }

  handleStepChange = i => {
    this.setState({ stepIndex: i })
  }

  render () {
    const { story, component } = this.props
    const { stepIndex } = this.state
    return (
      <div className='react-library-browse-component-sequence'>
        <SequenceControls
          key='control'
          className='sequence-controls'
          story={story}
          stepIndex={stepIndex}
          onStepChange={this.handleStepChange} />
        <RenderSafe key='output'>
          <Sequencer component={component} story={story} stepIndex={stepIndex} />
        </RenderSafe>
      </div>
    )
  }
}
