import React from 'react'
import renderBasicComponent from './utils/render-basic-component'
import getRenderProp from './utils/get-render-prop'

beforeEach(() => {
  // Hide logs from test console.
  console.error = () => {}
  console.warn = () => {}
  console.log = () => {}
})

test('A component can be connected and will receive the props.', () => {
  const { renderMock, store } = renderBasicComponent()

  expect(renderMock.mock.calls.length).toBe(1)
  expect(getRenderProp(renderMock, 0)).toBe(0)
})

test('Several props can be connected.', () => {
  const mapToProps = state => ({
    count: state.count,
    secondCount: state.secondCount
  })

  const { renderMock, store } = renderBasicComponent(mapToProps)

  expect(getRenderProp(renderMock, 0)).toBe(0)
  expect(getRenderProp(renderMock, 0, state => state.secondCount)).toBe(0)

  store.increment()

  expect(getRenderProp(renderMock, 1)).toBe(7)

  store.incrementSecond()

  expect(getRenderProp(renderMock, 2, state => state.secondCount)).toBe(1)
})

test('The component is only rerendered if connected props change.', () => {
  const { renderMock, store } = renderBasicComponent()

  expect(renderMock.mock.calls.length).toBe(1)

  store.increment()

  expect(renderMock.mock.calls.length).toBe(2)

  store.incrementSecond()

  // Incrementing the second count shouldn't cause a rerender.
  expect(renderMock.mock.calls.length).toBe(2)
})

test('Nested values and stores can also be connected.', () => {
  const mapToProps = state => ({
    count: state.count,
    secondCount: state.secondCount,
    deepCount: state.deep.count,
    substoreCount: state.substore.count
  })

  const { renderMock, store } = renderBasicComponent(mapToProps)

  expect(getRenderProp(renderMock, 0)).toBe(0)
  expect(getRenderProp(renderMock, 0, state => state.secondCount)).toBe(0)
  expect(getRenderProp(renderMock, 0, state => state.deepCount)).toBe(0)
  expect(getRenderProp(renderMock, 0, state => state.substoreCount)).toBe(0)

  store.increment()
  store.incrementSecond()
  store.substore.increment()
  store.incrementDeep()

  expect(getRenderProp(renderMock, 3)).toBe(7)
  expect(getRenderProp(renderMock, 3, state => state.secondCount)).toBe(1)
  expect(getRenderProp(renderMock, 3, state => state.deepCount)).toBe(1)
  expect(getRenderProp(renderMock, 3, state => state.substoreCount)).toBe(1)
})
