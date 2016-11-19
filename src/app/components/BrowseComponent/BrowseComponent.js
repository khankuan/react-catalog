import React, { Component, PropTypes } from 'react'

import * as docs from 'build/docs'
import * as stories from 'build/stories'
import * as components from 'build/components'

import { Link } from 'react-router'
import RenderSafe from '../RenderSafe/RenderSafe'
import BrowseComponentSequence from '../BrowseComponentSequence/BrowseComponentSequence'

import './BrowseComponent.css'

export default class BrowseComponent extends Component {

  static propTypes = {
    name: PropTypes.string,
    mode: PropTypes.string,
    tag: PropTypes.string
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
    } else if (React.isValidElement(story.content)) {
      output = story.content
    } else {
      const Component = components[name]
      output = <RenderSafe><Component {...story.content} /></RenderSafe>
    }
    return output
  }

  renderStory (tag, name, story, showName) {
    const output = this.renderStoryOutput(name, story)
    return (
      <div key={story.title} className='component-content-story' id={story.title}>
        {showName ? <h5><Link className='component-link' to={`/${tag}/${name}/${story.title}`}>{story.title}</Link></h5> : null}
        <div className='component-output'>
          {output}
        </div>
      </div>
    )
  }

  renderDefault (tag, name, showName) {
    const Component = components[name]
    return (
      <div key='default' className='component-content-story'>
        {showName ? <h5><Link className='component-link' to={`/${tag}/${name}`}>Default</Link></h5> : null}
        <div className='component-output'>
          <RenderSafe><Component key='default' /></RenderSafe>
        </div>
      </div>
    )
  }

  renderContent (tag, name, mode) {
    const output = []
    const doc = docs[name]
    const story = stories[name]
    if (!mode) {
      const { selectedStory } = this.state
      if (selectedStory) {
        const s = story.stories.find(s => s.title === selectedStory)
        output.push(this.renderStory(tag, name, s))
      } else if (doc.hasDefault) {
        output.push(this.renderDefault(tag, name))
      }
    } else {
      if (doc.hasDefault) {
        output.push(this.renderDefault(tag, name, true))
      }
      if (story && story.stories) {
        story.stories.forEach(s => {
          output.push(this.renderStory(tag, name, s, true))
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
    const { name, mode, tag } = this.props
    const content = this.renderContent(tag, name, mode)
    return (
      <div className='react-library-browse-component'>
        <h4 className='component-header'>
          <Link className='component-link' to={`/${tag}/${name}`}>{name}</Link>
          {!mode ? this.renderStorySelect(name) : null}
        </h4>
        { content || this.renderEmpty() }
      </div>
    )
  }
}
