import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'

export default (mapToProps, WrappedComponent) => {
  const ContextComponent = class extends Component {
    constructor(props, context) {
      super(props, context)

      const store = context.store

      store.subscribe(store => this.setState(mapToProps(store)))

      this.state = mapToProps(store)
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          {...mapToProps}
        />
      )
    }
  }

  ContextComponent.contextTypes = {
    store: PropTypes.object
  }

  return ContextComponent
}
