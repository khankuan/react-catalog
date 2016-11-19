import React, { Component, PropTypes } from 'react'

import componentTags from '../../componentTags'

import BrowseComponent from '../BrowseComponent/BrowseComponent'

import './Browse.css'

export default class Browse extends Component {

  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    routeParams: PropTypes.shape({
      tag: PropTypes.string,
      mode: PropTypes.oneOf(['full'])
    })
  }

  static contextTypes= {
    router: PropTypes.object
  }

  handleModeChange = (e) => {
    const mode = e.target.value
    const { router } = this.context
    const { location, routeParams } = this.props
    const { tag } = routeParams
    router.push({
      ...location,
      pathname: `/${tag}/browse${mode ? `/${mode}` : ''}`
    })
  }

  renderComponent (name, mode, tag) {
    return (
      <div className='component-section' key={name}>
        <BrowseComponent name={name} mode={mode} tag={tag} />
      </div>
    )
  }

  renderContent (tag, mode) {
    const componentTag = componentTags.find(c => c.tag === tag)
    return componentTag.components.map(c => this.renderComponent(c, mode, tag))
  }

  renderHeader (tag, mode) {
    return (
      <div className='browse-header'>
        <h2>{tag}</h2>
        <div className='option-group'>
          <label>
            <input type='radio' name='mode' checked={!mode} onChange={this.handleModeChange} value='' />
            Story Mode
          </label>
          <label>
            <input type='radio' name='mode' checked={mode === 'full'} onChange={this.handleModeChange} value='full' />
            Full
          </label>
        </div>
      </div>
    )
  }

  renderComponentBrowse (component, tag) {
    return (
      this.renderComponent(component, 'full', tag)
    )
  }

  render () {
    const { routeParams } = this.props
    const { tag, mode, component } = routeParams

    if (component) {
      return (
        <div className='react-library-browse'>
          {this.renderComponentBrowse(component, tag)}
        </div>
      );
    }

    return (
      <div className='react-library-browse'>
        {this.renderHeader(tag, mode)}
        {this.renderContent(tag, mode)}
      </div>
    )
  }
}
