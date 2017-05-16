import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as components from 'build/components'

import Story from '../../../lib/Story'

export default class Sequencer extends Component {

  static propTypes = {
    component: PropTypes.string,
    story: PropTypes.shape({
      sequence: PropTypes.array
    }),
    stepIndex: PropTypes.number,
    onPropsChange: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      sequenceKey: 0,
      sequenceProps: Story.getSequenceInitialProps(props.story),
      stepsRendered: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if ((nextProps.story !== this.props.story) ||
        (nextProps.stepIndex < this.props.stepIndex)) {
      this.setState({
        sequenceKey: this.state.sequenceKey + 1,
        sequenceProps: Story.getSequenceInitialProps(nextProps.story),
        stepsRendered: 0
      })
    }
  }

  componentDidMount () {
    this.checkSequence()
    this.notifyProps()
  }

  componentDidUpdate () {
    this.checkSequence(true)
  }

  async checkSequence (notify) {
    const { story, stepIndex } = this.props
    const { stepsRendered } = this.state
    let { sequenceProps } = this.state
    if (stepsRendered === stepIndex) {
      return
    }

    this.setState({ stepsRendered: stepsRendered + 1 })
    sequenceProps = await Story.getSequenceStepProps(this._component, story, stepsRendered + 1, sequenceProps)
    this.setState({ sequenceProps })
    if (notify) {
      this.notifyProps()
    }
  }

  notifyProps () {
    if (this.props.onPropsChange) {
      this.props.onPropsChange(this.state.sequenceProps)
    }
  }

  render () {
    const { sequenceKey, sequenceProps } = this.state
    const { component } = this.props
    const Component = components[component]

    return (
      <Component key={sequenceKey} ref={ref => (this._component = ref)} {...sequenceProps} />
    )
  }
}
