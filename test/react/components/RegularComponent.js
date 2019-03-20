import React, { Component } from 'react'

export default () => {
  const renderMock = jest.fn()

  class RegularComponent extends Component {
    render() {
      const { count } = this.props

      renderMock(this.props)

      return (
        <p>{count}</p>
      )
    }
  }

  return {
    Component: RegularComponent,
    renderMock
  }
}
