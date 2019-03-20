import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'
import assign from 'object-assign'
import { get } from './../utils/store'

export default (mapToProps, WrappedComponent) => {
  const WrapperComponent = class extends Component {
    constructor(props, context) {
      super(props, context)
      const store = get()
      this.handler = store => this.setState(mapToProps(store))
      // Subscribe to the store to be notified on state updates.
      store.subscribe(this.handler)
      this.state = mapToProps(store)
    }

    shouldComponentUpdate(nextProps, nextState) {
      // The component rerenders only if state on the store or props change.
      return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps)
    }

    componentWillUnmount() {
      this.store.unsubscribe(this.handler)
    }

    render() {
      // Passing props with spread operator cannot be easily polyfilled.
      const props = assign({}, this.props, this.state, mapToProps)
      return React.createElement(WrappedComponent, props)
    }
  }

  const name = WrappedComponent.displayName || WrappedComponent.name

  WrapperComponent.displayName = `Connected${name}`

  return WrapperComponent
}
