import { Component } from 'react'
import history from './history'
import * as components from 'build/components'
import { pages } from 'build/config'

export default class PageNotFound extends Component {

  componentWillMount () {
    let pathname
    if (pages && pages[0] && pages[0].props.path) {
      pathname = `/${pages[0].props.path}`
    }
    if (!pathname) {
      pathname = `/All/${Object.keys(components)[0]}`
    }
    history.replace({
      pathname
    })
  }

  render () {
    return null
  }
}
