import React, { Component, PropTypes } from 'react'

import * as docs from 'build/docs'
import * as components from 'build/components'

import deps from '../../dependencies'
import componentTags from '../../componentTags'

import DocumentationTable from '../DocumentationTable/DocumentationTable'
import NavLink from '../NavLink/NavLink'

import './RightBar.css'

export default class RightBar extends Component {

  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    routeParams: PropTypes.shape({
      tag: PropTypes.string,
      component: PropTypes.string,
      story: PropTypes.string
    }),
    component: PropTypes.node,
    queryProps: PropTypes.object,
    disabled: PropTypes.bool
  }

  static contextTypes= {
    router: PropTypes.object
  }

  handlePropsChange = (key, value) => {
    const { router } = this.context
    const { location } = this.props
    let { queryProps } = this.props
    const query = location.query
    if (value === undefined) {
      if (queryProps) {
        delete queryProps[key]
      }
    } else {
      if (!queryProps) {
        queryProps = {}
      }
      queryProps[key] = value
    }

    if (queryProps && Object.keys(queryProps).length > 0) {
      query.props = JSON.stringify(queryProps)
    } else {
      delete query.props
    }

    router.push({
      ...location,
      query
    })
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.error) {
      return false
    }
    return true
  }

  renderTable () {
    const { renderProps, routeParams, disabled } = this.props
    const { component } = routeParams
    return (
      <DocumentationTable
        schema={docs[component].props}
        renderProps={renderProps}
        onPropsChange={this.handlePropsChange}
        disabled={disabled} />
    )
  }

  renderLink = (name) => {
    if (!components[name]) {
      return <span className='dependency' key={name}>{name}</span>
    }
    const { tag } = this.props.routeParams
    const componentTag = componentTags.find(x => x.tag === tag)
    const tagHasComponent = componentTag.components.indexOf(name) > -1
    return (
      <NavLink
        key={name}
        active
        className='dependency'
        to={`/${tagHasComponent ? tag : 'All'}/${name}`}>
        {name}
      </NavLink>
    )
  }

  renderDependenciesRow (type, names) {
    if (names.length === 0) {
      return null
    }
    return (
      <tr>
        <td className='table-type'>{type}:</td>
        <td><div className='table-names'>{names.map(this.renderLink)}</div></td>
      </tr>
    )
  }

  renderDependencies () {
    const { component } = this.props.routeParams
    const on = deps.on[component] || []
    const by = deps.by[component] || []
    if (on.length === 0 && by.length === 0) {
      return null
    }

    return (
      <div>
        <h4 className='bar-header'>Dependencies</h4>
        <table className='react-library-dependency'>
          <tbody>
            {this.renderDependenciesRow('Uses', on)}
            {this.renderDependenciesRow('Used by', by)}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    const { error } = this.props

    return (
      <div className='react-library-right-bar'>
        {this.renderDependencies()}
        <div>
          <h4 className='bar-header'>Properties</h4>
          {error ? null : this.renderTable()}
        </div>
      </div>
    )
  }
}
