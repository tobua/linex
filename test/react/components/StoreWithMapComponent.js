import React from 'react'
import { Component } from 'linex'

export default mapStore => {
  const renderMock = jest.fn()

  class StoreComponent extends Component {
    constructor(props, context) {
      super(props, context)
      this.mapStore(mapStore)
    }

    render() {
      const { count } = this.state

      renderMock(this.state)

      return (
        <p>{count}</p>
      )
    }
  }

  return {
    Component: StoreComponent,
    renderMock
  }
}
