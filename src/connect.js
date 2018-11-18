import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default (mapToProps, WrappedComponent) => {
  console.log(mapToProps, WrappedComponent)
  const Hello = class extends Component {
    constructor(props, context) {
      super(props, context)

      console.log('connect store', context.store)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...mapToProps}
        />
      )
    }
  }

  Hello.contextTypes = {
    store: PropTypes.object
  }

  return Hello
}
