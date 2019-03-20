import * as stores from 'linex-stores'
import run from './utils/run'

beforeEach(() => {
  // Hide warnings.
  console.warn = () => {}
})

run('set(initial) store works as expected', (fallback, create) => {
  const store = create({
    state: {
      something: stores.set({
        hello: 'world'
      }),
      nested: {
        inside: stores.set(7)
      }
    }
  })

  expect(store.something.value.hello).toEqual('world')
  expect(store.nested.inside.value).toEqual(7)

  store.something.set({})
  store.nested.inside.set('hello')

  expect(store.something.value).toEqual({})
  expect(store.nested.inside.value).toEqual('hello')
})
