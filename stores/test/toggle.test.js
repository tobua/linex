import * as stores from 'linex-stores'
import run from './utils/run'

run('toggle(initial) store works as expected', (fallback, create) => {
  const store = create({
    state: {
      state: stores.toggle(),
      stateInitial: stores.toggle(true)
    }
  })

  expect(store.state.value).toEqual(false)
  expect(store.stateInitial.value).toEqual(true)

  expect(store.state.toggle()).toEqual(true)
  expect(store.stateInitial.toggle()).toEqual(false)

  expect(store.state.value).toEqual(true)
  expect(store.stateInitial.value).toEqual(false)

  expect(store.state.toggle(false)).toEqual(false)
  expect(store.stateInitial.toggle(false)).toEqual(false)

  expect(store.state.value).toEqual(false)
  expect(store.stateInitial.value).toEqual(false)
})
