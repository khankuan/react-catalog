import React, { Component, PropTypes } from 'react'
import cx from 'classnames';

import * as docs from 'build/docs'
import * as stories from 'build/stories'
import config, { pages } from 'build/config'
import componentTags from '../../componentTags'
import { componentSearch } from '../../searcher'

import NavHeader from '../NavHeader/NavHeader'
import NavLink from '../NavLink/NavLink'

import './LeftBar.css'
export default class LeftBar extends Component {

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
    show: true,
  }

  constructor (props) {
    super(props)
    const { search } = props.location.query
    const { tag, component } = props.routeParams
    const { resultsMap, feelingLucky } = this.getFilteredComponents(search)
    this.state = {
      expandedTag: {
        [tag]: true
      },
      expandedTagComponent: {
        [`${tag}_${component}`]: true
      },
      filteredComponents: resultsMap,
      feelingLucky,
      search
    }
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show })
  }

  getSavedQuery () {
    const { mode, theme, search } = this.props.location.query
    return { mode, theme, search }
  }

  getFilteredComponents (search) {
    if (!search) {
      return {}
    }
    const resultsMap = {}
    const results = componentSearch.search(search)
    results.forEach(name => (resultsMap[name] = true))
    const feelingLucky = results[0]
    return { resultsMap, feelingLucky }
  }

  hasQueryProps () {
    try {
      JSON.parse(this.props.location.query.props)
      return true
    } catch (err) {}
    return false
  }

  hasStories (component) {
    return stories[component] && stories[component].stories && stories[component].stories.length
  }

  handleTagClick = (tag, e) => {
    e.preventDefault()
    this.setState({
      expandedTag: {
        ...this.state.expandedTag,
        [tag]: !this.state.expandedTag[tag]
      }
    })
  }

  toggleExpandComponent = (tag, component) => {
    const key = `${tag}_${component}`
    this.setState({
      expandedTagComponent: {
        ...this.state.expandedTagComponent,
        [key]: !this.state.expandedTagComponent[key]
      }
    })
  }

  handleComponentExpandClick = (tag, component, e) => {
    e.preventDefault()
    e.stopPropagation()
    this.toggleExpandComponent(tag, component)
  }

  handleComponentClick = (tag, component, e) => {
    this.toggleExpandComponent(tag, component)
  }

  setSearch = (search, delay = 1000) => {
    const { resultsMap, feelingLucky } = this.getFilteredComponents(search)
    this.setState({
      filteredComponents: resultsMap,
      feelingLucky,
      search
    })

    clearTimeout(this._searchQueryTimer)
    this._searchQueryTimer = setTimeout(() => {
      const { location } = this.props
      const { router } = this.context
      router.push({
        ...location,
        query: {
          ...location.query,
          search: search || undefined
        }
      })
    }, delay)
  }

  handleSearchChange = e => {
    this.setSearch(e.target.value)
  }

  handleSearchClear = e => {
    this.setSearch(undefined, 0)
  }

  handleLinkClick = e => {
    if (this.state.show) {
      this.setState({ show: false });
    }
  }

  handleSearchPress = e => {
    //  Feeling lucky
    if (e.key === 'Enter' && e.target.value) {
      const { tag, component } = this.props.routeParams
      const { filteredComponents, feelingLucky } = this.state
      if (!filteredComponents[component] && feelingLucky) { //  If current component is not a result
        const componentTag = componentTags.find(x => x.tag === tag)
        const tagHasComponent = componentTag && componentTag.components.indexOf(feelingLucky) > -1
        const nextTag = tagHasComponent ? tag : 'All'
        const { router } = this.context
        router.push({
          pathname: `/${nextTag}/${feelingLucky}`,
          query: this.getSavedQuery()
        })
      }
    }
  }

  renderTagComponentStories (tag, component, componentActive, query) {
    const componentDoc = docs[component]
    const activeStory = this.props.routeParams.story
    const componentStories = stories[component]
    let output = []
    if (componentStories) {
      output.push(
        <NavLink
          className='story-link'
          to={{
            pathname: `/${tag}/${component}/browse`,
          }}
          key='browse2'
          active={(activeStory === 'browse') && componentActive}
          activeHighlights
          onClick={this.handleLinkClick}>
          Browse..
        </NavLink>
      )
      output = output.concat(
        (componentStories.stories || [])
          .map(story => (
            <NavLink
              className='story-link'
              to={{
                pathname: `/${tag}/${component}/${story.title}`,
                query
              }}
              onClick={this.handleLinkClick}
              key={story.title}
              active={(activeStory === story.title) && componentActive && !this.hasQueryProps()}
              activeHighlights>
              {story.title}
            </NavLink>
          ))
      )
    }

    output.unshift(
      <NavLink
        className='story-link'
        to={{
          pathname: `/${tag}/${component}`,
          query
        }}
        onClick={this.handleLinkClick}
        key='DEFAULT'
        active={!activeStory && componentActive}
        activeHighlights>
        { componentDoc.hasDefault ? 'Default' : 'View Props' }
      </NavLink>
    )

    return <div key='stories'>{output}</div>
  }

  renderTagComponent (tag, component, query) {
    const hasStories = this.hasStories(component)
    const expanded = this.state.expandedTagComponent[`${tag}_${component}`]
    const active = this.props.routeParams.tag === tag && this.props.routeParams.component === component
    let output = []
    output.push(
      <NavLink
        className='component-link'
        to={{
          pathname: `/${tag}/${component}`,
          query
        }}
        onClick={this.handleLinkClick}
        key={component}
        expandable={hasStories}
        expanded={expanded}
        active={active}
        activeHighlights={!hasStories}
        onExpandClick={this.handleComponentExpandClick.bind(null, tag, component)}
        onClick={this.handleComponentClick.bind(null, tag, component)}>
        {component}
      </NavLink>
    )
    if (hasStories && expanded) {
      output.push(this.renderTagComponentStories(tag, component, active, query))
    }

    return <div key={`${tag}_${component}`}>{output}</div>
  }

  renderTag (tag, active, count) {
    return (
      <NavLink
        className='tag-link'
        expandable
        expanded={active}
        key={tag}
        onClick={this.handleLinkClick}
        active={tag === this.props.routeParams.tag}
        onClick={this.handleTagClick.bind(null, tag)}>
        {tag} ({count})
      </NavLink>
    )
  }

  renderTagBrowse (tag) {
    const { browse } = this.props
    return (
      <NavLink
        className='component-link'
        key={`${tag}_browse`}
        onClick={this.handleLinkClick}
        active={tag === this.props.routeParams.tag && browse}
        to={`/${tag}/browse`}>
        Browse..
      </NavLink>
    )
  }

  renderTagSection (section, query) {
    const { filteredComponents } = this.state
    const { tag } = section
    let { components } = section
    if (filteredComponents) {
      components = components.filter(name => filteredComponents[name])
    }

    if (components.length === 0) {
      return null
    }

    const active = this.state.expandedTag[tag]
    let output = []
    if (active) {
      output.push(this.renderTagBrowse(tag))
      components.forEach(component => (output.push(this.renderTagComponent(tag, component, query))))
    }
    output.unshift(this.renderTag(tag, active, components.length))

    return output
  }

  renderTags (query, search) {
    const output = [
      <NavHeader key='componentTags' header='Components' className='bar-header' />,
      this.renderSearch(search)
    ]
    output.push(
      <div className='react-library-left-bar-tags' key='bar-tags'>
        {componentTags.map(section => this.renderTagSection(section, query))}
      </div>
    )

    return output
  }

  renderSearch (search) {
    const clear = search ? <span className='clear-button' onClick={this.handleSearchClear}>×</span> : null
    return (
      <div className='bar-search' key='search'>
        <input
          onChange={this.handleSearchChange}
          onKeyPress={this.handleSearchPress}
          value={search || ''}
          placeholder='Filter..' />
        {clear}
      </div>
    )
  }

  renderStatic () {
    const output = (pages || []).map((page, i) => {
      if (page.type === NavHeader) {
        return React.cloneElement(page, { key: `page_${i}`, className: 'bar-header' })
      } else {
        let { path } = page.props
        const { title } = page.props
        path = `/${path}`
        return (
          <NavLink
            className='page-link'
            key={`page_${i}`}
            onClick={this.handleLinkClick}
            active={path === this.props.location.pathname}
            activeHighlights
            to={path}>
            {title}
          </NavLink>
        )
      }
    })

    if (pages && pages[0] && pages[0].type !== NavHeader) {
      output.unshift(<NavHeader header='Pages' className='bar-header' key='page_default' />)
    }

    return output
  }

  renderClose() {
    return (
      <span className='show-button' onClick={this.toggleShow}>{this.state.show ? '×' : '≡'}</span>
    )
  }

  render () {
    const { search } = this.state
    return (
      <div className={cx('react-library-left-bar', { show: this.state.show })}>
        <h1 className='app-title'>{config.title}{this.renderClose()}</h1>
        {this.renderStatic()}
        {this.renderTags(this.getSavedQuery(), search)}
      </div>
    )
  }
}
