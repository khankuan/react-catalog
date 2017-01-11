import React, { Component, PropTypes } from 'react'

import * as docs from 'build/docs'
import * as stories from 'build/stories'
import * as components from 'build/components'

import NavLink from '../NavLink/NavLink'
import RenderSafe from '../RenderSafe/RenderSafe'
import BrowseComponentSequence from '../BrowseComponentSequence/BrowseComponentSequence'
import Well from '../Well/Well'

import './BrowseComponent.css'

export default class BrowseComponent extends Component {

  static propTypes = {
    name: PropTypes.string,
    mode: PropTypes.string,
    category: PropTypes.string,
    story: PropTypes.string,
  }

  constructor (props) {
    super(props)
    let selectedStory
    const doc = docs[props.name]
    const story = stories[props.name]
    if (doc.hasDefault) {
      selectedStory = ''
    } else if (story && story.stories[0]) {
      selectedStory = story.stories[0].title
    }
    this.state = {
      selectedStory
    }
  }

  handleStoryChange = e => {
    this.setState({
      selectedStory: e.target.value,
      stepIndex: 0
    })
  }

  renderStoryOutput (name, story) {
    let output
    if (story.sequence) {
      output = <BrowseComponentSequence className='component-sequence' story={story} component={name} />
    } else if (Array.isArray(story.content)) {
      output = React.Children.map(story.content, (child, i) => React.cloneElement(child, { key: i }))
    } else if (React.isValidElement(story.content)) {
      output = story.content
    } else {
      const Component = components[name]
      output = (
        <RenderSafe>
          <Component {...story.content} />
        </RenderSafe>
      )
    }
    return output
  }

  renderStory (category, name, story, showName) {
    const output = this.renderStoryOutput(name, story)
    return (
      <div key={story.title} className='component-content-story' id={story.title}>
        {showName ? <h5><NavLink className='component-link' to={`/${category}/${name}/${story.title}`}>{story.title}</NavLink></h5> : null}
        { story.description ? <p className='component-description'>{story.description}</p> : null }
        <Well className='component-output' theme={story.theme}>
          {output}
        </Well>
      </div>
    )
  }

  renderDefault (category, name, showName) {
    const Component = components[name]
    return (
      <div key='default' className='component-content-story'>
        {showName ? <h5><NavLink className='component-link' to={`/${category}/${name}`}>Default</NavLink></h5> : null}
        <Well className='component-output'>
          <RenderSafe><Component key='default' /></RenderSafe>
        </Well>
      </div>
    )
  }

  renderContent (category, name, mode, activeStory) {
    const output = []
    const doc = docs[name]
    const story = stories[name]
    if (!mode || (activeStory && activeStory !== 'browse')) {
      const selectedStory = activeStory || this.state.selectedStory
      if (selectedStory) {
        const s = story.stories.find(s => s.title === selectedStory)
        output.push(this.renderStory(category, name, s))
      } else if (doc.hasDefault) {
        output.push(this.renderDefault(category, name))
      }
    } else {
      if (doc.hasDefault) {
        output.push(this.renderDefault(category, name, true))
      }
      if (story && story.stories) {
        story.stories.forEach(s => {
          output.push(this.renderStory(category, name, s, true))
        })
      }
    }

    if (output.length === 0) {
      return null
    }

    return (
      <div className='component-content'>
        {output}
      </div>
    )
  }

  renderStorySelect (name) {
    const story = stories[name]
    const doc = docs[name]
    if (story && story.stories && story.stories.length) {
      const { selectedStory } = this.state
      return (
        <select value={selectedStory} onChange={this.handleStoryChange}>
          { doc.hasDefault ? <option value='' key='default'>Default</option> : null }
          {
            story.stories.map(s => <option value={s.title} key={s.title}>{s.title}</option>)
          }
        </select>
      )
    }
  }

  renderEmpty () {
    return <div className='content-empty'>Default is not available and component does not has any stories.</div>
  }

  render () {
    const { name, mode, category, story } = this.props
    const content = this.renderContent(category, name, mode, story)
    return (
      <div className='react-library-browse-component'>
        <h4 className='component-header'>
          <NavLink className='component-link' to={`/${category}/${name}`}>{name}</NavLink>
          {(!mode && !story) ? this.renderStorySelect(name) : null}
        </h4>
        { content || this.renderEmpty() }
      </div>
    )
  }
}
