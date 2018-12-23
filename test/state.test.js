import { create } from './..'
import delay from './utils/async'

test('Can init an empty store.', () => {
  const store = create({
    state: {}
  })

  expect(store).toBeDefined()
})

test('Can read a property from the state.', () => {
  const store = create({
    state: {
      count: 6
    }
  })

  expect(store.count).toEqual(6)
})

test('State is immutable.', () => {
  const store = create({
    state: {
      count: 6
    }
  })

  store.count = 7

  expect(store.count).toEqual(6)
})

test('Can access nested properties.', () => {
  const store = create({
    state: {
      count: 6,
      deep: {
        count: 7
      }
    }
  })

  expect(store.deep.count).toEqual(7)
})
