import React from 'react'
import renderRegularComponent from './utils/render-regular-component'
import getRenderProp from './utils/get-render-prop'

beforeEach(() => {
  // Hide logs from test console.
  console.warn = () => {}
  // Hide plugin output.
  console.log = () => {}
})

test('The component will rerender when the state changes.', () => {
  const { renderMock, store } = renderRegularComponent()

  // First call, count prop value.
  expect(getRenderProp(renderMock, 0)).toBe(0)

  store.increment(undefined)

  // Second call, count prop value should have increased.
  expect(getRenderProp(renderMock, 1)).toBe(7)
})
