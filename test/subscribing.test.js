import run from './utils/run'
import { products } from './stores'

run('Can subscribe to a store and receive updates', (fallback, create) => {
  const mockHandler = jest.fn()
  const store = create(products())

  store.subscribe(mockHandler)

  expect(mockHandler.mock.calls.length).toEqual(0)

  store.add('Banana')

  expect(mockHandler.mock.calls.length).toEqual(1)

  store.unsubscribe(mockHandler)
  store.add('Citrus')

  expect(mockHandler.mock.calls.length).toEqual(1)
})
