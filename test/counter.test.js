import run from './utils/run'
import { counter } from './stores'

beforeEach(() => {
  // Hide plugin.
  console.log = () => {}
})

run('Can init the counter store', (fallback, create) => {
  const store = create(counter(create))

  expect(store).toBeDefined()
  expect(store.count).toEqual(0)
})

run('Can read the current count from the counter store', (fallback, create) => {
  const store = create(counter(create))

  expect(store.count).toEqual(0)
})
