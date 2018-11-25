import React from 'react'
import renderBasicComponent from './utils/render-basic-component'
import getRenderProp from './utils/get-render-prop'

beforeEach(() => {
  // Hide missing prop warnings.
  console.error = () => {}
  console.warn = () => {}
})

test('The component will rerender when the state changes.', () => {
  const { renderMock, store } = renderBasicComponent()

  // First call, count prop value.
  expect(getRenderProp(renderMock, 0)).toBe(0)

  store.increment()

  // Second call, count prop value should have increased.
  expect(getRenderProp(renderMock, 1)).toBe(7)
})
