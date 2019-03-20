import * as stores from 'linex-stores'
import run from './utils/run'

run('count(initial) store works as expected', (fallback, create) => {
  const store = create({
    state: {
      counter: stores.count(5),
      active: stores.toggle(true)
    }
  })

  expect(store.counter.value).toEqual(5)
  expect(store.counter.increment()).toEqual(6)
  expect(store.counter.value).toEqual(6)
  expect(store.active.value).toEqual(true)
  expect(store.active.toggle()).toEqual(false)
  expect(store.active.value).toEqual(false)
})
