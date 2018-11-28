import React from 'react'
import renderBasicComponent from './react/utils/render-basic-component'
import getRenderProp from './react/utils/get-render-prop'
import { create } from './..'
import delay from './utils/async'
import { counter } from './stores'

test('Can init an empty fallback store.', () => {
  const store = create({
    state: {},
    fallback: true
  })

  expect(store).toBeDefined()
})

test('Can read a property from the state.', () => {
  const store = create({
    state: {
      count: 6
    },
    fallback: true
  })

  expect(store.__fallback).toEqual(true)
  expect(store.count).toEqual(6)
})

test('Can read a property from the state.', () => {
  counter.fallback = true
  const store = create(counter)

  expect(store.__fallback).toEqual(true)
  expect(store.count).toEqual(0)

  store.increment()

  expect(store.count).toEqual(7)

  expect(store.doubleCount()).toEqual(14)
})

test('Connect also works in fallback mode.', () => {
  const mapToProps = (state, store) => ({
    count: state.count,
    secondCount: state.secondCount
  })

  const { renderMock, store } = renderBasicComponent(mapToProps, true)

  expect(getRenderProp(renderMock, 0)).toBe(0)
  expect(getRenderProp(renderMock, 0, state => state.secondCount)).toBe(0)

  store.increment()

  expect(getRenderProp(renderMock, 1)).toBe(7)

  store.incrementSecond()

  expect(getRenderProp(renderMock, 2, state => state.secondCount)).toBe(1)
})
