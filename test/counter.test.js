import { create } from './..'
import delay from './util/async'
import { counter } from './fixtures'

let store

beforeEach(() => {
  store = create(counter)
})

test('Can init the counter store.', () => {
  expect(store).toBeDefined()
  expect(store.count).toEqual(6)
})

test('Can read the current count from the counter store.', () => {
  expect(store.count).toEqual(6)
})

// test('State is adapted after regular action.', () => {
//   const store = create.default(simpleCounterStore)
//   store.run('increment')
//   expect(store.state().count).toEqual(13)
// })
//
// test('State is adapted after async action.', async (done) => {
//   const store = create.default(simpleCounterStore)
//   expect(store.state().count).toEqual(6)
//   store.run('incrementDelayed')
//   expect(store.state().count).toEqual(6)
//
//   setTimeout(() => {
//     expect(store.state().count).toEqual(13)
//   }, 1500)
// })
