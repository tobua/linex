import * as stores from 'linex-stores'
import run from './utils/run'

beforeEach(() => {
  // Hide component loaded message.
  console.log = () => {}
})

run('load(importFunc) can load Components', async (fallback, create) => {
  const store = create({
    state: {
      loadedComponent: stores.load(() => import('./components/Loaded'))
    }
  })

  expect(store.loadedComponent.Component).toEqual(null)
  expect(store.loadedComponent.loading).toEqual(false)
  expect(store.loadedComponent.loaded).toEqual(false)

  store.loadedComponent.load()

  expect(store.loadedComponent.Component).toEqual(null)
  expect(store.loadedComponent.loading).toEqual(true)
  expect(store.loadedComponent.loaded).toEqual(false)

  await new Promise(done => setTimeout(() => {
    expect(store.loadedComponent.Component).toBeDefined()
    expect(store.loadedComponent.loading).toEqual(false)
    expect(store.loadedComponent.loaded).toEqual(true)
    done()
  }, 20))
})

run('load(importFunc) catches error during load', async (fallback, create) => {
  const store = create({
    state: {
      loadedComponent: stores.load(() => (
        new Promise((done, fail) => setTimeout(() => fail(), 10)))
      )
    }
  })

  expect(store.loadedComponent.Component).toEqual(null)
  expect(store.loadedComponent.loading).toEqual(false)
  expect(store.loadedComponent.loaded).toEqual(false)
  expect(store.loadedComponent.error).toEqual(false)

  store.loadedComponent.load()

  expect(store.loadedComponent.Component).toEqual(null)
  expect(store.loadedComponent.loading).toEqual(true)
  expect(store.loadedComponent.loaded).toEqual(false)
  expect(store.loadedComponent.error).toEqual(false)

  await new Promise(done => setTimeout(() => {
    expect(store.loadedComponent.Component).toEqual(null)
    expect(store.loadedComponent.loading).toEqual(false)
    expect(store.loadedComponent.loaded).toEqual(false)
    expect(store.loadedComponent.error).toEqual(true)
    done()
  }, 20))
})
