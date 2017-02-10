import React, { PropTypes, Component } from 'react'
import cx from 'classnames'

import './SequenceControls.css'

import NavLink from '../NavLink/NavLink'

export default class SequenceControls extends Component {

  static propTypes = {
    story: PropTypes.shape({
      sequence: PropTypes.array
    }),
    stepIndex: PropTypes.number,
    onStepChange: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  render () {
    const { story, stepIndex, onStepChange, className } = this.props
    const { sequence } = story
    return (
      <div className={cx('react-catalog-sequence-controls', className)}>
        <div className='sequence-list'>
          {
            sequence.map((step, i) => ([
              <NavLink
                key={i}
                className='sequence-link'
                active={stepIndex === i}
                onClick={onStepChange.bind(null, i)}>
                {step.title}
              </NavLink>,
              i < sequence.length - 1 ? <span key={`${i}_arrow`} className='sequence-arrow'>→</span> : null
            ]))
          }
        </div>
        <div className='steppers'>
          <NavLink
            className='sequence-link'
            onClick={onStepChange.bind(null, 0)}>
            ⟳
          </NavLink>
          <NavLink
            className='sequence-link'
            onClick={onStepChange.bind(null, stepIndex - 1)}
            disabled={stepIndex === 0}>
            Previous
          </NavLink>
          <NavLink
            className='sequence-link'
            onClick={onStepChange.bind(null, stepIndex + 1)}
            disabled={stepIndex === sequence.length - 1}>
            Next
          </NavLink>
        </div>
      </div>

    )
  }
}
