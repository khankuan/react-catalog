import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import componentCategories from '../../componentCategories'

import BrowseComponent from '../BrowseComponent/BrowseComponent'

import './Browse.css'

export default class Browse extends Component {

  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    routeParams: PropTypes.shape({
      category: PropTypes.string,
      mode: PropTypes.oneOf(['full']),
      story: PropTypes.string,
    })
  }

  static contextTypes= {
    router: PropTypes.object
  }

  handleModeChange = (e) => {
    const mode = e.target.value
    const { router } = this.context
    const { location, routeParams } = this.props
    const { category } = routeParams
    router.push({
      ...location,
      pathname: `/${category}/browse${mode ? `/${mode}` : ''}`
    })
  }

  renderComponent (name, mode, category, story) {
    return (
      <div className='component-section' key={name}>
        <BrowseComponent name={name} mode={story ? 'single' : mode} category={category} story={story} />
      </div>
    )
  }

  renderContent (category, mode) {
    const componentCategory = componentCategories.find(c => c.category === category)
    return componentCategory.components.map(c => this.renderComponent(c, mode, category))
  }

  renderHeader (category, mode) {
    return (
      <div className='browse-header'>
        <h2>{category}</h2>
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

  renderComponentBrowse (component, category, story) {
    return (
      this.renderComponent(component, 'full', category, story)
    )
  }

  render () {
    const { routeParams } = this.props
    const { category, mode, component, story } = routeParams

    if (component) {
      return (
        <div className='react-catalog-browse'>
          <DocumentTitle title={`${component} - Browse ${category}`} />
          {this.renderComponentBrowse(component, category, story)}
        </div>
      );
    }

    return (
      <div className='react-catalog-browse'>
        <DocumentTitle title={`Browse ${category}`} />
        {this.renderHeader(category, mode)}
        {this.renderContent(category, mode, story)}
      </div>
    )
  }
}
