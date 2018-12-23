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

test('Nested stores have access to the rootStore.', () => {
  // Declare a reference to the root store that can be passed to substores
  // before the root is initialized.
  let store = () => store

  store = create({
    state: {
      count: 0,
      nested: create({
        state: {
          count: 1,
          furtherNested: create({
            state: {
              count: 2
            }
          }, store)
        }
      }, store)
    }
  })

  expect(store.nested.root.count).toEqual(0)
  expect(store.count).toEqual(0)
  expect(store.nested.count).toEqual(1)
  expect(store.nested.furtherNested.count).toEqual(2)
  expect(store.nested.furtherNested.root.count).toEqual(0)
})

test('Methods have read access to the rootStore.', () => {
  const mockMethod = jest.fn()

  let store = () => store

  store = create({
    state: {
      count: 1,
      nested: create({
        state: {
          count: 2
        },
        methods: {
          increment: (state, value, rootStore) => {
            mockMethod(rootStore.count)
          }
        }
      }, store)
    },
    fallback: true
  })

  store.nested.increment()
  expect(mockMethod.mock.calls[0][0]).toEqual(1)
  expect(store.count).toEqual(1)
})

test('Setters to rootStore have no effect.', () => {
  const mockMethod = jest.fn()

  let store = () => store

  store = create({
    state: {
      count: 1,
      nested: create({
        state: {
          count: 2
        },
        methods: {
          increment: (state, value, rootStore) => {
            rootStore.count = 5
          }
        }
      }, store)
    }
  })

  store.nested.increment()
  expect(store.count).toEqual(1)
})

test('rootStore is frozen in fallback mode.', () => {
  const mockShouldCatch = jest.fn()

  let store = () => store

  store = create({
    state: {
      count: 1,
      nested: create({
        state: {
          count: 2
        },
        methods: {
          increment: (state, value, rootStore) => {
            try {
              rootStore.count = 5
            } catch(error) {
              mockShouldCatch()
            }
          }
        }
      }, store)
    },
    fallback: true
  })

  store.nested.increment()
  expect(mockShouldCatch.mock.calls.length).toEqual(1)
})
