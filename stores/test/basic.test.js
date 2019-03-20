import * as stores from 'linex-stores'
import run from './utils/run'

run('Different stores can be added to the state', (fallback, create) => {
  const store = create({
    state: {
      active: stores.toggle(),
      count: stores.count(),
      countInitial: stores.count(5),
      nested: {
        count: stores.count(2)
      }
    }
  })

  // Toggle
  expect(store.active.value).toEqual(false)
  store.active.toggle()
  expect(store.active.value).toEqual(true)
  store.active.toggle(false)
  expect(store.active.value).toEqual(false)

  // Count
  expect(store.count.value).toEqual(0)
  expect(store.count.increment()).toEqual(1)
  expect(store.count.value).toEqual(1)

  // Count with Initial Value
  expect(store.countInitial.value).toEqual(5)
  expect(store.countInitial.decrement(2)).toEqual(3)
  expect(store.countInitial.value).toEqual(3)

  // Nested
  expect(store.nested.count.value).toEqual(2)
})
