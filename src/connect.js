import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'
import assign from './utils/assign'

export default (mapToProps, WrappedComponent) => {
  const ContextComponent = class extends Component {
    constructor(props, context) {
      super(props, context)
      const store = context.store
      // Subscribe to the store to be notified on state updates.
      store.subscribe(store => this.setState(mapToProps(store)))
      this.state = mapToProps(store)
    }

    shouldComponentUpdate(nextProps, nextState) {
      // The component rerenders only if state on the store or props change.
      return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps)
    }

    render() {
      // Passing props with spread operator cannot be easily polyfilled.
      const props = assign({}, this.props, this.state, mapToProps)
      return React.createElement(WrappedComponent, props)
    }
  }

  ContextComponent.contextTypes = {
    store: PropTypes.object
  }

  return ContextComponent
}
