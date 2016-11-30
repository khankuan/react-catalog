import { Component } from 'react'
import history from './history'
import * as components from 'build/components'
import { pages } from 'build/config'

export default class PageNotFound extends Component {

  componentWillMount () {
    let pathname
    if (pages) {
      for (let i = 0; i < pages.length; i++) {
        if (pages[i] && pages[i].props.path) {
          pathname = `/${pages[i].props.path}`
          break;
        }
      }
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
