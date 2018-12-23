import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'
import assign from './utils/assign'

export default (mapToProps, WrappedComponent) => {
  const ContextComponent = class extends React.Component {
    constructor(props, context) {
      super(props, context)
      this.store = context.store
      this.handler = store => this.setState(mapToProps(store))
      // Subscribe to the store to be notified on state updates.
      this.store.subscribe(this.handler)
      this.state = mapToProps(this.store)
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

  ContextComponent.contextTypes = {
    store: PropTypes.object
  }

  const name = WrappedComponent.displayName || WrappedComponent.name

  ContextComponent.displayName = `Connected${name}`

  return ContextComponent
}
