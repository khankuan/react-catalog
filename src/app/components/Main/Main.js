import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import * as docs from 'build/docs'
import * as stories from 'build/stories'

import './Main.css'

import Markdown from '../Markdown/Markdown'
import Previewer from '../Previewer/Previewer'
import NavLink from '../NavLink/NavLink'
import SequenceControls from '../SequenceControls/SequenceControls'

export default class Main extends Component {

  static propTypes = {
    location: PropTypes.object,
    routeParams: PropTypes.shape({
      category: PropTypes.string,
      component: PropTypes.string,
      story: PropTypes.string
    }),
    story: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.any,
      description: PropTypes.string
    }),
    renderProps: PropTypes.object
  }

  static contextTypes= {
    router: PropTypes.object
  }

  formatText = text => {
    return text.split('\n')
      .map((t, i) => <Markdown className='header-description' key={i} source={t} />)
  }

  handleQueryChange = query => {
    const { router } = this.context
    const { location } = this.props
    router.push({
      ...location,
      query
    })
  }

  handleModeChange = mode => {
    const query = { ...this.props.location.query }
    query.mode = mode
    this.handleQueryChange(query)
  }

  handleThemeChange = theme => {
    const query = { ...this.props.location.query }
    query.theme = theme
    this.handleQueryChange(query)
  }

  handleSequenceChange = i => {
    const query = { ...this.props.location.query }
    if (i === 0) {
      delete query.sequence
    } else {
      query.sequence = i + 1
    }
    this.handleQueryChange(query)
  }

  renderSequence = story => {
    const { query } = this.props.location
    const stepIndex = query.sequence ? parseInt(query.sequence) - 1 : 0

    return (
      <SequenceControls
        story={story}
        stepIndex={stepIndex}
        onStepChange={this.handleSequenceChange} />
    )
  }

  renderStory (story) {
    if (story) {
      const description = story.description
      const isSequence = !!story.sequence
      return (
        <div>
          <h3 className='story-title'>{story.title}</h3>
          {isSequence ? this.renderSequence(story) : null}
          {description}
        </div>
      )
    }
    return null
  }

  renderHeaderCategories (componentDoc) {
    if (!componentDoc.categories) {
      return null
    }

    const categories = componentDoc.categories.map(category => {
      return (
        <NavLink
          className='category-link'
          to={{ pathname: `/${category}/browse` }}
          key={category}
          active={category === this.props.routeParams.category}>
          {category}
        </NavLink>
      )
    })

    return (
      <div className='header-categories'>
        {categories}
      </div>
    )
  }

  renderHeaderTags (componentDoc) {
    if (!componentDoc.tags) {
      return null
    }

    return (
      <div className='header-tags'>
        <em>{componentDoc.tags.join(', ')}</em>
      </div>
    )
  }

  renderHeader (story) {
    const { component } = this.props.routeParams
    const componentDoc = docs[component]
    const description = componentDoc ? componentDoc.description : null
    return (
      <div className='react-catalog-main-header'>
        <h2 className='component-title'>{component}</h2>
        {this.renderHeaderCategories(componentDoc)}
        {this.renderHeaderTags(componentDoc)}
        {description ? this.formatText(description) : null}
        {this.renderStory(story)}
      </div>
    )
  }

  renderDefaultError (component) {
    return <div className='default-error'>Default is not available, component has required props.</div>
  }

  renderPreview () {
    const { location, component, renderProps } = this.props
    const { query } = location
    return (
      <Previewer
        className='previewer'
        component={component}
        renderProps={renderProps}
        mode={query.mode}
        theme={query.theme}
        onModeChange={this.handleModeChange}
        onThemeChange={this.handleThemeChange} />
    )
  }

  render () {
    const { component } = this.props.routeParams
    const { story } = this.props
    const doc = docs[component]
    if (!doc) {
      return null
    }

    return (
      <div className='react-catalog-main'>
        <DocumentTitle title={`${component}${(story && story.title) ? ` - ${story.title}` : ''}`} />
        {this.renderHeader(story)}
        { !story && !doc.hasDefault ? this.renderDefaultError(component) : this.renderPreview() }
      </div>
    )
  }
}
