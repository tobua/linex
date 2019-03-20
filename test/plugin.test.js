import run from './utils/run'

run('Plugin isn\'t accessible on the store', (fallback, create) => {
  global.console.warn = jest.fn()
  const store = create({
    state: {},
    plugin: {
      log: (method) => {
        console.log(`Method ${method} was called.`)
      }
    }
  })

  // In non fallback mode an empty proxy is returned to avoid breaking errors
  // when accessing nested properties.
  expect(typeof store.log).toEqual(fallback ? 'undefined' : 'object')

  if (!fallback) {
    expect(typeof store.log.log).toEqual('object')
    expect(typeof store.log.log.log).toEqual('object')
  }

  // A warning on the console should be thrown that the method doesn't exist.
  if (!fallback) {
    expect(global.console.warn).toHaveBeenCalled()
  }
})

run('Plugin is called on update', (fallback, create) => {
  const mockPlugin = jest.fn()
  const store = create({
    state: {},
    update: {
      increment: () => {}
    },
    plugin: {
      log: mockPlugin
    }
  })

  expect(mockPlugin.mock.calls.length).toEqual(0)
  store.increment()
  expect(mockPlugin.mock.calls.length).toEqual(1)
})

run('Plugin is called on read in proxy mode', (fallback, create) => {
  const mockPlugin = jest.fn()
  const store = create({
    state: {
      count: 1
    },
    plugin: {
      log: mockPlugin
    }
  })

  expect(mockPlugin.mock.calls.length).toEqual(0)
  expect(store.count).toEqual(1)
  expect(mockPlugin.mock.calls.length).toEqual(fallback ? 0 : 1)
})

run('Plugins receive the proper arguments', (fallback, create) => {
  const mockPlugin = jest.fn()
  const store = create({
    state: {
      count: 1
    },
    update: {
      increment: (state) => ++state.count
    },
    plugin: {
      log: mockPlugin
    }
  })

  expect(store.increment()).toEqual(2)
  // Syntax: plugin(name, value, type)
  expect(mockPlugin.mock.calls[0][0].toString()).toEqual('increment()')
  expect(mockPlugin.mock.calls[0][1]).toEqual(2)
  expect(mockPlugin.mock.calls[0][2]).toEqual('call')

  if (!fallback) {
    expect(store.count).toEqual(2)
    expect(mockPlugin.mock.calls[1][0].toString()).toEqual('count')
    expect(mockPlugin.mock.calls[1][1]).toEqual(2)
    expect(mockPlugin.mock.calls[1][2]).toEqual('read')
  }
})
