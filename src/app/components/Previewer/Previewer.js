import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom/server'
import cx from 'classnames'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/jsx/jsx'
const beautifyHtml = require('js-beautify').html
import reactElementToJSXString from 'react-element-to-jsx-string'

import * as components from 'build/components'
import RoundButton from '../RoundButton/RoundButton'
import RenderSafe from '../RenderSafe/RenderSafe'
import Sequencer from '../Sequencer/Sequencer'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import './Previewer.css'

const modes = ['react', 'jsx', 'html']
const themes = ['checker', 'dark', 'light']

export default class Previewer extends Component {

  static propTypes = {
    component: PropTypes.node,
    renderProps: PropTypes.object,
    className: PropTypes.string,
    mode: PropTypes.oneOf(modes),
    theme: PropTypes.oneOf(themes),
    onModeChange: PropTypes.func.isRequired,
    onThemeChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    mode: modes[0],
    theme: themes[0]
  }

  handleModeClick = () => {
    const nextMode = modes[(modes.indexOf(this.props.mode) + 1) % modes.length]
    this.props.onModeChange(nextMode === modes[0] ? undefined : nextMode)
  }

  handleThemeClick = () => {
    const nextTheme = themes[(themes.indexOf(this.props.theme) + 1) % themes.length]
    this.props.onThemeChange(nextTheme === themes[0] ? undefined : nextTheme)
  }

  renderHtml (component) {
    const { theme } = this.props
    const htmlString = ReactDOM.renderToString(component)
      .replace(/ data-reactid="[^"]*"/ig, '')
      .replace(/ data-react-checksum="[^"]*"/ig, '')
      .replace(/ data-reactroot="[^"]*"/ig, '')
      .replace(/<noscript><\/noscript>/g, '')

    return (
      <Codemirror
        className='previewer-html'
        value={beautifyHtml(htmlString, { indent_size: 2, unformatted: [] })}
        options={{
          mode: 'htmlmixed',
          theme: theme === 'dark' ? 'material' : 'default',
          readOnly: true,
          lineWrapping: true
        }}
      />
    )
  }

  renderJSX (component) {
    const { theme } = this.props
    return (
      <Codemirror
        key='code'
        className='previewer-jsx'
        value={reactElementToJSXString(component)}
        options={{
          mode: 'jsx',
          theme: theme === 'dark' ? 'material' : 'default',
          readOnly: true,
          lineWrapping: true
        }}
      />
    )
  }

  renderSequenceSource () {
    const { component, mode, renderProps } = this.props
    let output
    if (renderProps) {
      const Component = components[component.props.component]
      const sequenceComponent = <Component {...renderProps} />
      if (mode === 'html') {
        output = this.renderHtml(sequenceComponent)
      } else if (mode === 'jsx') {
        output = this.renderJSX(sequenceComponent)
      }
    }

    return (
      <div key='source'>
        {output}
      </div>
    )
  }

  renderComponent () {
    const { component, mode } = this.props
    if (mode === 'react') {
      return component
    }
    return (
      <div style={{ display: 'none' }}>
        {component}
      </div>
    )
  }

  renderComponentSource () {
    const { component, mode } = this.props
    if (mode === 'react') {
      return null
    } else if (component.type === Sequencer) {
      return this.renderSequenceSource()
    } else if (mode === 'html') {
      return this.renderHtml(component)
    } else if (mode === 'jsx') {
      return this.renderJSX(component)
    } else {
      throw new Error('Invalid Mode')
    }
  }

  render () {
    const { theme, className } = this.props
    const buttonTheme = theme === 'dark' ? 'light' : 'dark'
    return (
      <div className={cx('react-library-previewer', `theme-${theme}`, className)}>
        <RenderSafe>{this.renderComponent()}</RenderSafe>
        <RenderSafe>{this.renderComponentSource()}</RenderSafe>
        <div className='previewer-controls'>
          <RoundButton theme={buttonTheme} onClick={this.handleModeClick}>{'</>'}</RoundButton>
          <RoundButton theme={buttonTheme} onClick={this.handleThemeClick}>{'B/W'}</RoundButton>
        </div>
      </div>
    )
  }
}
