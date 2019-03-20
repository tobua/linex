import React from 'react'
import run from './../utils/run'
import { counter } from './../stores'
import createRegularComponent from './components/RegularComponent'
import renderApp from './utils/render-app'

beforeEach(() => {
  // Hide missing prop warnings.
  console.error = () => {}
  // Hide warnings.
  console.warn = () => {}
  // Hide plugins.
  console.log = () => {}
})

test('App with an empty store will render.', () => {
  renderApp(<p>Hello</p>)
})

test('App with an empty store and a component will render the component once.', () => {
  const RegularComponent = createRegularComponent()
  const Component = RegularComponent.Component
  const renderMock = RegularComponent.renderMock

  renderApp(<Component />)

  expect(renderMock.mock.calls.length).toBe(1)
})

run('App with a store will render', (fallback, create) => {
  const store = create(counter(create))

  renderApp(<p>Hello</p>)
})
