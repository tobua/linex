import React from 'react'
import { create, connect } from 'linex'
import { counter } from './../../stores'
import createRegularComponent from './../components/RegularComponent'
import renderApp from './render-app'

export default (mapToProps = store => ({ count: store.count })) => {
  const store = create(counter(create))
  const RegularComponent = createRegularComponent()
  const Component = RegularComponent.Component
  const renderMock = RegularComponent.renderMock

  const ConnectedComponent = connect(mapToProps, Component)

  renderApp(<ConnectedComponent />)

  return {
    renderMock,
    store
  }
}
