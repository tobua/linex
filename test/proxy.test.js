import { create } from './..'
import delay from './utils/async'

test('Can access top-level state property.', () => {
  const store = create({
    state: {
      count: 5
    }
  })

  expect(store.count).toEqual(5)
})

test('Can access top-level state array.', () => {
  const store = create({
    state: {
      products: [
        'apple',
        'banana',
        'citrus'
      ]
    }
  })

  expect(store.products.length).toEqual(3)
  // expect(store.products[1]).toEqual('banana')
})
