import React from 'react'
import run from './../utils/run'
import { counter } from './../stores'
import createStatefulComponent from './components/StoreComponent'
import createStatefulComponentWithMap from './components/StoreWithMapComponent'
import getRenderProp from './utils/get-render-prop'
import renderApp from './utils/render-app'

beforeEach(() => {
  // Hide plugin output.
  console.log = () => {}
})

run('A StatefulComponent can be created', (fallback, create) => {
  // Init store.
  const store = create(counter(create))
  // Create StatefulComponent with renderMock inside.
  const StatefulComponent = createStatefulComponent()
  const renderMock = StatefulComponent.renderMock

  const mapStore = store => ({
    count: store.count,
    secondCount: store.secondCount
  })

  renderApp(<StatefulComponent.Component mapStore={mapStore} />)

  expect(getRenderProp(renderMock, 0, store => store.count)).toBe(0)
  expect(getRenderProp(renderMock, 0, store => store.secondCount)).toBe(0)

  expect(renderMock.mock.calls.length).toEqual(1)

  store.increment()

  expect(getRenderProp(renderMock, 1)).toBe(7)

  store.incrementSecond()

  expect(getRenderProp(renderMock, 2, state => state.secondCount)).toBe(1)
})

run('A StatefulComponent can also set the mapStore function internally', (fallback, create) => {
  // Init store.
  const store = create(counter(create))

  const mapStore = store => ({
    count: store.count,
    secondCount: store.secondCount
  })

  // Create StatefulComponent with renderMock inside.
  const StatefulComponent = createStatefulComponentWithMap(mapStore)
  const renderMock = StatefulComponent.renderMock

  renderApp(<StatefulComponent.Component />)

  expect(getRenderProp(renderMock, 0, store => store.count)).toBe(0)
  expect(getRenderProp(renderMock, 0, store => store.secondCount)).toBe(0)

  expect(renderMock.mock.calls.length).toEqual(1)

  store.increment()

  expect(getRenderProp(renderMock, 1)).toBe(7)

  store.incrementSecond()

  expect(getRenderProp(renderMock, 2, state => state.secondCount)).toBe(1)
})
