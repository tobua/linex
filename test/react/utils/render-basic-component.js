import React from 'react'
import { create, connect } from './../../..'
import { counter } from './../../stores'
import createBasicComponent from './../components/BasicComponent'
import renderApp from './render-app'

export default (mapToProps = state => ({ count: state.count }), fallback) => {
  counter.fallback = fallback
  const store = create(counter)
  const BasicComponent = createBasicComponent()
  const Component = BasicComponent.Component
  const renderMock = BasicComponent.renderMock

  const ConnectedComponent = connect(mapToProps, Component)

  renderApp(store, <ConnectedComponent />)

  return {
    renderMock,
    store
  }
}
