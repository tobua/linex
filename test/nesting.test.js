import { create } from './..'
import { products, farm } from './stores'

test('Methods on a nested store can be accessed.', () => {
  const productsStore = create(products)
  const store = create(farm(productsStore))

  expect(store.products.items.length).toEqual(1)

  store.products.add('Banana')

  expect(store.products.items.length).toEqual(2)
})

test('Subscriptions to the rootStore will update when nested stores change.', () => {
  const subscribeMock = jest.fn()
  const productsStore = create(products)
  const store = create(farm(productsStore))

  store.subscribe(subscribeMock)

  expect(subscribeMock.mock.calls.length).toBe(0)

  store.changeType('Vegetables')

  expect(subscribeMock.mock.calls.length).toBe(1)

  store.products.add('Carrot')

  expect(subscribeMock.mock.calls.length).toBe(1)
})
