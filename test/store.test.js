import run from './utils/run'
import { counter } from './stores'

run('Can init the counter store', (fallback, create) => {
  const store = create(counter(create))

  expect(store.subscribe).toBeInstanceOf(Function)
  expect(store['@@toStringTag']).toEqual('Linex Store')
  expect(store._reactFragment).toEqual({})
  expect(store.later).toBeInstanceOf(Function)
  expect(store.later(() => {})).toBeInstanceOf(Promise)
})

run('No warning for non-unique keys in production', (fallback, create) => {
  global.console.warn = jest.fn()

  create({
    state: {
      amibiguous: 0
    },
    update: {
      amibiguous: state => state
    },
    read: {
      amibiguous: state => state
    }
  })

  expect(global.console.warn).not.toHaveBeenCalled()
})
