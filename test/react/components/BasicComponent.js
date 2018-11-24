import React from 'react'

export default () => {
  const renderMock = jest.fn()

  class BasicComponent extends React.Component {
    render() {
      const { count } = this.props

      renderMock(count)

      return (
        <p>{count}</p>
      )
    }
  }

  return {
    Component: BasicComponent,
    renderMock
  }
}
