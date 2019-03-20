import React from 'react'
import { Component } from 'linex'

export default () => {
  const renderMock = jest.fn()

  class StoreComponent extends Component {
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
