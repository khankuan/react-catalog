import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

import './DocumentationTable.css'

export default class DocumentationTable extends Component {

  static propTypes = {
    schema: PropTypes.object,
    renderProps: PropTypes.object,
    onPropsChange: PropTypes.func,
    disabled: PropTypes.bool
  }

  handleNumberChange = (key, e) => {
    if (!isNaN(e.target.value)) {
      this.handleChange(key, parseInt(e.target.value))
    }
  }

  handleStringChange = (key, e) => {
    this.handleChange(key, e.target.value)
  }

  handleChange = (key, value) => {
    if (this.props.onPropsChange) {
      const { schema } = this.props
      try {
        // Set to undefined if value is default
        value = (value === schema[key].defaultValue.value) ? undefined : value
      } catch (err) {}
      this.props.onPropsChange(key, value)
    }
  }

  //  If its array, we can't change because we don't know which index to change
  isChangeable = (key) => {
    return key.indexOf('[]') === -1
  }

  //   Get value in props given a dotted key (eg, user.avatar.url)
  getValueForKey (key) {
    const keys = key.split('.')
    let curProps = this.props.renderProps
    if (!curProps) {
      return
    }
    for (let i = 0; i < keys.length; i++) {
      if (curProps[keys[i]]) {
        curProps = curProps[keys[i]]
      } else {
        return
      }
    }
    return curProps
  }

  //  Make new props given a dotted key (eg, user.avatar.url) and a new value
  mergeValueToKey (key, value) {
    const curProps = { ...this.props.renderProps }
    const keys = key.split('.')
    let prop = curProps
    for (let i = 0; i < keys.length - 1; i++) {
      prop[keys[i]] = { ...(prop[keys[i]] || {}) }  //  clone the sub object
      prop = prop[keys[i]]
    }
    prop[keys[keys.length - 1]] = value
    return curProps
  }

  //  Flatten prop for shapes
  getRowsForProp (key = '', prop) {
    //  Patch gendoc that did not have a consistent schema
    if (prop.name && !prop.type) {
      prop.type = { name: prop.name, value: prop.value }
    }

    if (!prop.type) {
      return []
    }

    if (prop.type.name === 'arrayOf') {
      prop = prop.type.value || prop.value
      return this.getRowsForProp(key + '[]', prop)
    }

    if (prop.type.name !== 'shape') {
      return [{ key, prop }]
    } else {
      const props = prop.type.value
      if (!props) {
        return []
      }
      let rows = [{ key, prop }]
      Object.keys(props).forEach(subKey => {
        const prefixKey = (key ? `${key}.` : '') + subKey
        rows = rows.concat(this.getRowsForProp(prefixKey, props[subKey]))
      })
      return rows
    }
  }

  //  split key to get prefix (before last dot) and actual key name
  splitKey (key) {
    const index = key.lastIndexOf('.')
    if (index === -1) {
      return { key, prefix: '' }
    } else {
      return { key: key.substring(index + 1), prefix: key.substring(0, index + 1) }
    }
  }

  renderForBoolean (key, changable, disabled) {
    if (!changable) {
      return null
    }

    const checked = this.getValueForKey(key) || false
    return (
      <input
        className='type-bool'
        type='checkbox'
        onChange={this.handleChange.bind(null, key, !checked)}
        checked={checked}
        disabled={disabled} />
    )
  }

  renderForNumber (key, changable, disabled) {
    if (!changable) {
      return null
    }

    const value = parseFloat(this.getValueForKey(key) || 0)
    return (
      <input
        className='type-number'
        type='number'
        onChange={this.handleNumberChange.bind(null, key)}
        value={value}
        disabled={disabled} />
    )
  }

  renderForString (key, changable, disabled) {
    if (!changable) {
      return null
    }

    const value = this.getValueForKey(key) || ''
    return (
      <input
        className='type-string'
        onChange={this.handleStringChange.bind(null, key)}
        value={value}
        disabled={disabled} />
    )
  }

  renderForOneOf (key, values, changable, disabled, prop) {
    const curValue = this.getValueForKey(key)
    if (!Array.isArray(values)) { //  Fallback
      return this.renderForString(key, changable, disabled);
    }
    const items = values.map(v => v.value).map(value => {
      if (!isNaN(value)) {
        value = parseFloat(value)
      }
      if (typeof value === 'string' && value[0] === "'" && value[value.length - 1] === "'") {
        value = value.substring(1, value.length - 1)
      }
      const active = curValue == value
      const changedValue = active ? (prop.required ? value : undefined) : value
      return (
        <span
          key={value}
          className={cx('type-value', { active, changable })}
          onClick={(changable && !disabled)? this.handleChange.bind(null, key, changedValue) : null}>
          {value}
        </span>
      )
    })

    return (
      <span className='type-oneof'>{items}</span>
    )
  }

  renderTable (schema) {
    const { disabled } = this.props
    const rows = this.getRowsForProp('', { type: { name: 'shape', value: schema } }).slice(1)
    return rows.map((row, i) => {
      const prop = row.prop
      const key = this.splitKey(row.key)
      let defaultValue = prop.defaultValue ? prop.defaultValue.value : null

      //  For string values, gendoc gives quotes '', we need to remove them
      let type = prop.type.name
      if (defaultValue === 'null') {
        defaultValue = null
      }
      if (type === 'bool') {
        defaultValue = !!defaultValue
      }
      if (typeof defaultValue === 'string' && defaultValue[0] === "'" && defaultValue[defaultValue.length - 1] === "'") {
        defaultValue = defaultValue.substring(1, defaultValue.length - 1)
      }
      if (type === 'enum') {  //  rename for the stake of less confusion
        type = 'oneOf'
      }

      const changable = this.isChangeable(row.key)

      return (
        <tr key={row.key} className={cx({ alt: i % 2 })}>
          <td>
            <span className='type-prefix'>
              {key.prefix}
            </span>
            <span>{key.key}</span>
            {prop.array ? '[]' : null}
            {prop.required ? ' *' : null}
          </td>
          <td
            onClick={this.handleChange.bind(null, row.key, defaultValue)}>
            <span className={cx('type-value changable', { active: this.getValueForKey(row.key) == defaultValue })}>
              {defaultValue}
            </span>
          </td>
          <td>
            <span className='field-type'>{type}</span>
            {type === 'number' ? this.renderForNumber(row.key, changable, disabled) : null}
            {type === 'string' ? this.renderForString(row.key, changable, disabled) : null}
            {type === 'bool' ? this.renderForBoolean(row.key, changable, disabled) : null}
            {type === 'oneOf' ? this.renderForOneOf(row.key, prop.type.value, changable, disabled, prop) : null}
          </td>
          <td className='field-description'>{prop.description ? <span title={prop.description}>?</span> : null}</td>
        </tr>
      )
    })
  }

  render () {
    const { schema } = this.props

    return (
      <div className='react-gallery-documentation-table'>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Default</td>
              <td>Type</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.renderTable(schema)}
          </tbody>
        </table>
      </div>
    )
  }
}
