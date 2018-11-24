import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default (mapToProps, WrappedComponent) => {
  const ContextComponent = class extends Component {
    constructor(props, context) {
      super(props, context)

      const store = context.store

      this.store = mapToProps(store)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.store}
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
