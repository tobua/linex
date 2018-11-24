import { create } from './..'

test('A selector will be created.', () => {
  const store = create({
    state: {},
    selectors: {
      total: [
        state => state.products,
        (products) => {
          return 18
        }
      ]
    }
  })

  expect(store.total).toEqual(18)
})

test('Selector will return the correct value.', () => {
  const store = create({
    state: {
      products: [
        {
          name: 'Apple',
          price: 5
        },
        {
          name: 'Banana',
          price: 6
        },
        {
          name: 'Citrus',
          price: 7
        }
      ]
    },
    selectors: {
      total: [
        state => state.products,
        (products) => {
          return products.reduce((total, products) => total + products.price, 0)
        }
      ]
    }
  })

  expect(store.total).toEqual(18)
})

test('A selector will only be calculated once if no parameter changes occur.', () => {
  const mockSelector = jest.fn(count => count * 2)
  const store = create({
    state: {
      count: 7
    },
    selectors: {
      double: [
        state => state.count,
        mockSelector
      ]
    }
  })

  expect(mockSelector.mock.calls.length).toEqual(0)
  store.double
  expect(mockSelector.mock.calls.length).toEqual(1)
  store.double
  expect(mockSelector.mock.calls.length).toEqual(1)
})

test('A selector be recalculated on state changes.', () => {
  const mockSelector = jest.fn(count => count * 2)
  const store = create({
    state: {
      count: 7
    },
    methods: {
      increment: (state, value) => {
        state.count++
      }
    },
    selectors: {
      double: [
        state => state.count,
        mockSelector
      ]
    }
  })

  expect(mockSelector.mock.calls.length).toEqual(0)
  store.double
  expect(mockSelector.mock.calls.length).toEqual(1)
  store.increment()
  store.double
  expect(mockSelector.mock.calls.length).toEqual(2)
})
