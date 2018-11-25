import React from 'react'
import renderBasicComponent from './utils/render-basic-component'
import getRenderProp from './utils/get-render-prop'

beforeEach(() => {
  // Hide missing prop warnings.
  console.error = () => {}
  console.warn = () => {}
})

test('A component can be connected and will receive the props.', () => {
  const { renderMock, store } = renderBasicComponent()

  expect(renderMock.mock.calls.length).toBe(1)
  expect(getRenderProp(renderMock, 0)).toBe(0)
})