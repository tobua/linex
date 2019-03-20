import run from './utils/run'
import { products, farm } from './stores'

run('Updates on a nested store can be accessed', (fallback, create) => {
  const productsStore = create(products())
  const store = create(farm(productsStore))

  expect(productsStore.items.length).toEqual(1)
  expect(store.products.items.length).toEqual(1)

  store.products.add('Banana')

  expect(productsStore.items.length).toEqual(2)
  expect(store.products.items.length).toEqual(2)
})

run('Subscriptions to the rootStore will update when nested stores change', (fallback, create) => {
  const subscribeMock = jest.fn()
  const productsStore = create(products())
  const store = create(farm(productsStore))

  store.subscribe(subscribeMock)

  expect(subscribeMock.mock.calls.length).toBe(0)

  store.changeType('Vegetables')

  expect(subscribeMock.mock.calls.length).toBe(1)

  store.products.add('Carrot')

  expect(subscribeMock.mock.calls.length).toBe(2)
})

run('Subscriptions to anotherStores have the same effect as ones to the root', (fallback, create) => {
  const subscribeMock = jest.fn()
  const productsStore = create(products())
  const store = create(farm(productsStore))

  productsStore.subscribe(subscribeMock)

  expect(subscribeMock.mock.calls.length).toBe(0)

  store.changeType('Vegetables')

  expect(subscribeMock.mock.calls.length).toBe(1)

  store.products.add('Carrot')

  expect(subscribeMock.mock.calls.length).toBe(2)
})

run('anotherStores can access their update methods', (fallback, create, get) => {
  const store = create({
    state: {
      count: 1,
      secondCount: 2,
      nested: create({
        state: {
          count: 3,
          secondCount: 4
        },
        update: {
          incrementFirst: (state, store) => {
            state.count++
            store.incrementSecond()
          },
          incrementSecond: (state, store) => {
            state.secondCount++
          }
        }
      })
    },
    update: {
      incrementFirst: (state, store) => {
        ++state.count
        store.incrementSecond()
      },
      incrementSecond: (state, store) => {
        ++state.secondCount
      }
    }
  })

  expect(store.count).toEqual(1)
  expect(store.nested.count).toEqual(3)

  store.incrementFirst()

  expect(store.count).toEqual(2)
  expect(store.secondCount).toEqual(3)

  store.nested.incrementFirst()

  expect(store.count).toEqual(2)
  expect(store.secondCount).toEqual(3)

  expect(store.nested.count).toEqual(4)
  expect(store.nested.secondCount).toEqual(5)
})

run('anotherStores can access all other stores', (fallback, create, get) => {
  const store = create({
    state: {
      count: 1,
      first: create({
        state: {
          count: 2
        },
        update: {
          incrementFirst: (state, store) => {
            state.count++
            get().increment()
            get().second.incrementSecond()
          }
        }
      }),
      second: create({
        state: {
          count: 3
        },
        update: {
          incrementSecond: (state, store) => {
            state.count++
          }
        }
      }),
    },
    update: {
      increment: (state, store) => {
        state.count++
      }
    }
  })

  expect(store.count).toEqual(1)
  expect(store.first.count).toEqual(2)
  expect(store.second.count).toEqual(3)

  store.first.incrementFirst()

  expect(store.count).toEqual(2)
  expect(store.first.count).toEqual(3)
  expect(store.second.count).toEqual(4)
})

run('Doesn\'t report any not found paths when nesting stores', (fallback, create) => {
  const subscribeMock = jest.fn()
  const productsStore = create(products())
  const store = create(farm(productsStore))

  store.subscribe(subscribeMock)

  expect(subscribeMock.mock.calls.length).toBe(0)

  store.changeType('Vegetables')

  expect(subscribeMock.mock.calls.length).toBe(1)

  store.products.add('Carrot')

  expect(subscribeMock.mock.calls.length).toBe(2)
})
