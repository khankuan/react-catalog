import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames';

import * as docs from 'build/docs'
import * as stories from 'build/stories'
import config, { pages } from 'build/config'
import componentCategories from '../../componentCategories'
import { componentSearch } from '../../searcher'

import NavHeader from '../NavHeader/NavHeader'
import NavLink from '../NavLink/NavLink'

import './LeftBar.css'
export default class LeftBar extends Component {

  static propTypes = {
    location: PropTypes.object,
    routeParams: PropTypes.shape({
      category: PropTypes.string,
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
    const { category, component } = props.routeParams
    const { resultsMap, feelingLucky } = this.getFilteredComponents(search)
    this.state = {
      expandedCategory: {
        [category]: true
      },
      expandedCategoryComponent: {
        [`${category}_${component}`]: true
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

  handleCategoryClick = (category, e) => {
    e.preventDefault()
    this.setState({
      expandedCategory: {
        ...this.state.expandedCategory,
        [category]: !this.state.expandedCategory[category]
      }
    })
  }

  toggleExpandComponent = (category, component) => {
    const key = `${category}_${component}`
    this.setState({
      expandedCategoryComponent: {
        ...this.state.expandedCategoryComponent,
        [key]: !this.state.expandedCategoryComponent[key]
      }
    })
  }

  handleComponentExpandClick = (category, component, e) => {
    e.preventDefault()
    e.stopPropagation()
    this.toggleExpandComponent(category, component)
  }

  handleComponentClick = (category, component, e) => {
    this.toggleExpandComponent(category, component)
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
      const { category, component } = this.props.routeParams
      const { filteredComponents, feelingLucky } = this.state
      if (!filteredComponents[component] && feelingLucky) { //  If current component is not a result
        const componentCategory = componentCategories.find(x => x.category === category)
        const categoryHasComponent = componentCategory && componentCategory.components.indexOf(feelingLucky) > -1
        const nextCategory = categoryHasComponent ? category : 'All'
        const { router } = this.context
        router.push({
          pathname: `/${nextCategory}/${feelingLucky}`,
          query: this.getSavedQuery()
        })
      }
    }
  }

  renderCategoryComponentStories (category, component, componentActive, query) {
    const componentDoc = docs[component]
    const activeStory = this.props.routeParams.story
    const componentStories = stories[component]
    let output = []
    if (componentStories) {
      output.push(
        <NavLink
          className='story-link'
          to={{
            pathname: `/${category}/${component}/browse`,
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
                pathname: `/${category}/${component}/${story.title}`,
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
          pathname: `/${category}/${component}`,
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

  renderCategoryComponent (category, component, query) {
    const hasStories = this.hasStories(component)
    const expanded = this.state.expandedCategoryComponent[`${category}_${component}`]
    const active = this.props.routeParams.category === category && this.props.routeParams.component === component
    let output = []
    output.push(
      <NavLink
        className='component-link'
        to={{
          pathname: `/${category}/${component}`,
          query
        }}
        onClick={this.handleLinkClick}
        key={component}
        expandable={hasStories}
        expanded={expanded}
        active={active}
        activeHighlights={!hasStories}
        onExpandClick={this.handleComponentExpandClick.bind(null, category, component)}
        onClick={this.handleComponentClick.bind(null, category, component)}>
        {component}
      </NavLink>
    )
    if (hasStories && expanded) {
      output.push(this.renderCategoryComponentStories(category, component, active, query))
    }

    return <div key={`${category}_${component}`}>{output}</div>
  }

  renderCategory (category, active, count) {
    return (
      <NavLink
        className='category-link'
        expandable
        expanded={active}
        key={category}
        onClick={this.handleLinkClick}
        active={category === this.props.routeParams.category}
        onClick={this.handleCategoryClick.bind(null, category)}>
        {category} ({count})
      </NavLink>
    )
  }

  renderCategoryBrowse (category) {
    const { browse } = this.props
    return (
      <NavLink
        className='component-link'
        key={`${category}_browse`}
        onClick={this.handleLinkClick}
        active={category === this.props.routeParams.category && browse}
        to={`/${category}/browse`}>
        Browse..
      </NavLink>
    )
  }

  renderCategorySection (section, query) {
    const { filteredComponents } = this.state
    const { category } = section
    let { components } = section
    if (filteredComponents) {
      components = components.filter(name => filteredComponents[name])
    }

    if (components.length === 0) {
      return null
    }

    const active = this.state.expandedCategory[category]
    let output = []
    if (active) {
      output.push(this.renderCategoryBrowse(category))
      components.forEach(component => (output.push(this.renderCategoryComponent(category, component, query))))
    }
    output.unshift(this.renderCategory(category, active, components.length))

    return output
  }

  renderCategories (query, search) {
    const output = [
      <NavHeader key='componentCategories' header='Components' className='bar-header' />,
      this.renderSearch(search)
    ]
    output.push(
      <div className='react-catalog-left-bar-categories' key='bar-categories'>
        {componentCategories.map(section => this.renderCategorySection(section, query))}
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
      <div className={cx('react-catalog-left-bar', { show: this.state.show })}>
        <h1 className='app-title'>{config.title}{this.renderClose()}</h1>
        {this.renderStatic()}
        {this.renderCategories(this.getSavedQuery(), search)}
      </div>
    )
  }
}
