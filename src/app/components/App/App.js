import React, { Component, PropTypes } from 'react'

import * as stories from 'build/stories'
import * as components from 'build/components'

import StaticPage from '../StaticPage/StaticPage'
import LeftBar from '../LeftBar/LeftBar'
import Main from '../Main/Main'
import RightBar from '../RightBar/RightBar'
import Browse from '../Browse/Browse'
import Sequencer from '../Sequencer/Sequencer'

import './App.css'

export default class App extends Component {

  static propTypes = {
    location: PropTypes.object,
    routeParams: PropTypes.shape({
      tag: PropTypes.string,
      component: PropTypes.string,
      story: PropTypes.string
    })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    currentProps: null
  }

  componentWillMount () {
    this.redirectIfNotFound(this.props)
  }

  componentWillUpdate (nextProps) {
    this.redirectIfNotFound(nextProps)
  }

  redirectIfNotFound (props) {
    const { route, routeParams } = props
    const { component, story, tag } = routeParams
    const browse = tag && !component && !story
    if (!route.page && !browse && story !== 'browse') { //  if component page
      if (!components[component]) {
        const { router } = this.context
        router.push('')
      }
    }
    const componentStory = stories[component] && stories[component].stories.find(x => x.title === story);
    if (componentStory && React.isValidElement(componentStory.content)) {
      const { router } = this.context
      router.replace({
        pathname: `/${tag}/${component}/browse`,
      })
    }
  }

  getActiveStory (props) {
    const { component, story } = props.routeParams
    if (story && stories[component] && stories[component].stories) {
      return stories[component].stories.find(item => item.title === story)
    }
    return null
  }

  getQueryProps () {
    const { query } = this.props.location
    try {
      return JSON.parse(query.props)
    } catch (err) {}
    return {}
  }

  denormalizeProps (props) {
    props = { ...props }
    Object.keys(props).forEach(prop => {
      const value = props[prop]
      if (prop.indexOf('.') > -1) {
        delete props[prop]
        const keys = prop.split('.')
        const key = keys[keys.length - 1]
        let obj = props
        keys.slice(0, -1).forEach(key => {
          obj[key] = obj[key] || {}
          obj = obj[key]
        })
        obj[key] = value
      }
    })
    return props
  }

  handleSequencePropsChange = currentProps => {
    this.setState({ currentProps })
  }

  renderNodeStoryComponent (story, queryProps) {
    return React.cloneElement(story.content, queryProps)
  }

  renderObjectStoryComponent (story, queryProps) {
    const { component } = this.props.routeParams
    let renderProps = {
      ...(story ? story.content : {}),
      ...this.denormalizeProps(queryProps)
    }

    const Comp = components[component]
    if (!Comp) {
      throw new Error('Component not available')
    }
    return <Comp {...renderProps} />
  }

  renderSequenceStoryComponent (story) {
    const { query } = this.props.location
    const { component } = this.props.routeParams
    return (
      <Sequencer
        component={component}
        story={story}
        stepIndex={parseInt(query.sequence || 1) - 1}
        onPropsChange={this.handleSequencePropsChange}
        />
    )
  }

  renderComponent (story, queryProps) {
    if (!story || typeof story.content === 'object') {  //  Default or Object story
      const component = this.renderObjectStoryComponent(story, queryProps)
      return { component, renderProps: component.props }
    } else if (React.isValidElement(story.content)) { //  Node story
      const component = this.renderNodeStoryComponent(story, queryProps)
      return { component, renderProps: component.props }
    } else if (story.sequence) {  //  sequence story
      const component = this.renderSequenceStoryComponent(story)
      return { component, renderProps: this.state.currentProps }
    }
  }

  renderContent (routeParams, location, browse) {
    const { route } = this.props
    const { story } = routeParams
    if (route.page) {
      return <StaticPage className={route.className}>{route.page}</StaticPage>
    } else if (browse || story === 'browse') {
      return (
        <Browse
          key='browse'
          routeParams={routeParams}
          location={location} />
      )
    } else {
      const story = this.getActiveStory(this.props)
      const queryProps = this.getQueryProps()
      let error
      let rendered, component, renderProps
      try {
        rendered = this.renderComponent(story, queryProps)
        component = rendered.component
        renderProps = rendered.renderProps
      } catch (err) {
        error = err
      }

      return [
        <Main
          key='main'
          routeParams={routeParams}
          location={location}
          component={component}
          renderProps={renderProps}
          story={story}
          error={error} />,
        <RightBar
          key='rightBar'
          routeParams={routeParams}
          location={location}
          renderProps={renderProps}
          queryProps={queryProps}
          error={error}
          disabled={story && story.sequence} />
      ]
    }
  }

  render () {
    const { routeParams, location } = this.props
    const { tag, component, story } = routeParams
    const browse = tag && !component && !story
    return (
      <div className='react-library-app'>
        <LeftBar routeParams={routeParams} location={location} browse={browse} />
        {this.renderContent(routeParams, location, browse)}
      </div>
    )
  }
}
