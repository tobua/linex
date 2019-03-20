import run from './utils/run'

run('Can init an empty store', (fallback, create) => {
  const store = create({
    state: {}
  })

  expect(store).toBeDefined()
})

run('Can read a property from the state', (fallback, create) => {
  const store = create({
    state: {
      count: 6
    }
  })

  expect(store.count).toEqual(6)
})

run('State is immutable with proxies', (fallback, create) => {
  const warnMock = jest.fn()
  const consoleWarn = console.warn
  console.warn = warnMock
  const store = create({
    state: {
      count: 6
    }
  })

  store.count = 7

  expect(store.count).toEqual(fallback ? 7 : 6)

  // Will trigger a warning that setters are not available on Proxies.
  if (!fallback) {
    expect(warnMock.mock.calls.length).toEqual(1)
  }

  console.warn = consoleWarn
})

run('Can access nested properties', (fallback, create) => {
  const store = create({
    state: {
      count: 6,
      deep: {
        count: 7
      }
    }
  })

  expect(store.deep.count).toEqual(7)
})

run('Can access top-level state property', (fallback, create) => {
  const store = create({
    state: {
      count: 5
    }
  })

  expect(store.count).toEqual(5)
})

run('Can access top-level state array', (fallback, create) => {
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
  expect(store.products[1]).toEqual('banana')
})
