import * as stores from 'linex-stores'
import run from './utils/run'

run('count(initial) store works as expected', (fallback, create) => {
  const store = create({
    state: {
      counter: stores.count(),
      counterInitial: stores.count(5)
    }
  })

  expect(store.counter.value).toEqual(0)
  expect(store.counterInitial.value).toEqual(5)
})

run('Can be increment and decrement', (fallback, create) => {
  const store = create({
    state: {
      counter: stores.count(),
      counterInitial: stores.count(5)
    }
  })

  expect(store.counter.value).toEqual(0)
  expect(store.counterInitial.value).toEqual(5)

  expect(store.counter.increment()).toEqual(1)
  expect(store.counterInitial.increment()).toEqual(6)

  expect(store.counter.value).toEqual(1)
  expect(store.counterInitial.value).toEqual(6)

  expect(store.counter.decrement()).toEqual(0)
  expect(store.counterInitial.decrement()).toEqual(5)

  expect(store.counter.value).toEqual(0)
  expect(store.counterInitial.value).toEqual(5)
})

run('Can increment and decrement by value', (fallback, create) => {
  const store = create({
    state: {
      counter: stores.count()
    }
  })

  expect(store.counter.value).toEqual(0)
  expect(store.counter.increment(1)).toEqual(1)
  expect(store.counter.value).toEqual(1)
  expect(store.counter.increment(2)).toEqual(3)
  expect(store.counter.value).toEqual(3)
  expect(store.counter.increment(3)).toEqual(6)
  expect(store.counter.value).toEqual(6)
  expect(store.counter.decrement(1)).toEqual(5)
  expect(store.counter.value).toEqual(5)
  expect(store.counter.decrement(2)).toEqual(3)
  expect(store.counter.value).toEqual(3)
  expect(store.counter.decrement(3)).toEqual(0)
  expect(store.counter.value).toEqual(0)
  expect(store.counter.decrement(4)).toEqual(-4)
  expect(store.counter.value).toEqual(-4)
  expect(store.counter.increment(2)).toEqual(-2)
  expect(store.counter.value).toEqual(-2)
  expect(store.counter.increment(2)).toEqual(0)
  expect(store.counter.value).toEqual(0)
})
