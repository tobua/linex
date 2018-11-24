import React from 'react'
import { create, connect } from './../..'
import { counter } from './../stores'
import createBasicComponent from './components/BasicComponent'
import renderApp from './utils/render-app'

beforeEach(() => {
  // Hide missing prop warnings.
  console.error = () => {}
  console.warn = () => {}
})

test('A component can be connected.', () => {
  const store = create(counter)
  const BasicComponent = createBasicComponent()
  const Component = BasicComponent.Component
  const renderMock = BasicComponent.renderMock

  const mapToProps = (state) => ({
    count: state.count
  })

  const ConnectedComponent = connect(mapToProps, Component)

  renderApp(store, <ConnectedComponent />)

  expect(renderMock.mock.calls.length).toBe(1)
})

test('A connected store will receive the mapped props.', () => {
  const store = create(counter)
  const BasicComponent = createBasicComponent()
  const Component = BasicComponent.Component
  const renderMock = BasicComponent.renderMock

  const mapToProps = (state) => ({
    count: state.count
  })

  const ConnectedComponent = connect(mapToProps, Component)

  renderApp(store, <ConnectedComponent />)

  expect(renderMock.mock.calls[0][0]).toBe(0)
})
