import React, { Component } from 'react'

import './RenderSafe.css'

export default class RenderSafe extends Component {

  state = {}

  unstable_handleError (error) {
    this.setState({ error })
  }

  render () {
    const { error } = this.state
    if (error) {
      return (
        <div className='react-gallery-render-safe'>Rendering error: {error.stack || error}</div>
      )
    }
    return this.props.children
  }
}
