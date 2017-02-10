import React, { PropTypes, Component } from 'react'

import SequenceControls from '../SequenceControls/SequenceControls'
import Sequencer from '../Sequencer/Sequencer'
import RenderSafe from '../RenderSafe/RenderSafe'
import Previewer from '../Previewer/Previewer';

import './BrowseComponentSequence.css'

export default class BrowseComponentSequence extends Component {

  static propTypes = {
    story: PropTypes.shape({
      sequence: PropTypes.array
    }),
    component: PropTypes.string,
    theme: PropTypes.string,
  }

  state ={
    stepIndex: 0
  }

  handleStepChange = i => {
    this.setState({ stepIndex: i })
  }

  handleProps = componentProps => {
    this.setState({ componentProps });
  }

  render () {
    const { story, component } = this.props
    const { stepIndex, componentProps } = this.state
    return (
      <div className='react-catalog-browse-component-sequence'>
        <SequenceControls
          key='control'
          className='sequence-controls'
          story={story}
          stepIndex={stepIndex}
          onStepChange={this.handleStepChange} />
        <RenderSafe key='output'>
          <Previewer
            hasPadding
            controlsFirst
            renderProps={componentProps}
            component={<Sequencer component={component} story={story} stepIndex={stepIndex} onPropsChange={this.handleProps} />}
            defaultTheme={story.theme || 'light'}
          />

        </RenderSafe>
      </div>
    )
  }
}
