import run from './utils/run'
import { model } from 'linex'
import { counter } from './stores'

beforeEach(() => {
  // Hide plugin.
  console.log = () => {}
})

run('Can init the counter store', (fallback, create) => {
  const store = create(counter(model))

  expect(store).toBeDefined()
  expect(store.count).toEqual(0)
})

run('Can read the current count from the counter store', (fallback, create) => {
  const store = create(counter(model))

  expect(store.count).toEqual(0)
})
