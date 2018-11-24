import { create } from './..'
import delay from './utils/async'
import { counter } from './stores'

let store

beforeAll(() => {
  store = create(counter)
})

test('Can init the counter store.', () => {
  expect(store).toBeDefined()
  expect(store.count).toEqual(0)
})

test('Can read the current count from the counter store.', () => {
  expect(store.count).toEqual(0)
})
