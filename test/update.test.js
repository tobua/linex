import run from './utils/run'
import after from './utils/after'

run('Calling a method will modify the state', (fallback, create) => {
  const store = create({
    state: {
      count: 0
    },
    update: {
      increment: state => {
        return ++state.count
      }
    }
  })

  expect(store.increment()).toEqual(1)

  expect(store.count).toEqual(1)

  store.increment()

  expect(store.count).toEqual(2)
})

run('Values can be passed to updates', (fallback, create) => {
  const store = create({
    state: {
      count: 0
    },
    update: {
      incrementTo: (state, store, value) => {
        state.count = value
      }
    }
  })

  store.incrementTo(5)

  expect(store.count).toEqual(5)
})

run('Async actions will update the state immediately and upon delay', (fallback, create) => {
  const store = create({
    state: {
      count: 0
    },
    update: {
      increment: state => {
        return ++state.count
      },
      incrementDelayed: (state, store) => {
        state.count++

        store.later((done) => {
          setTimeout(() => {
            store.increment()
            done()
          }, 10)
        })
      }
    }
  })

  expect(store.count).toEqual(0)

  store.incrementDelayed()

  expect(store.count).toEqual(1)

  return after(20, () => {
    expect(store.count).toEqual(2)
  })
})

run('Async updates change the state after awaiting', async (fallback, create) => {
  const store = create({
    state: {
      count: 0
    },
    update: {
      incrementBy: (state, store, value) => {
        return state.count += value
      },
      incrementDelayed: (state, store) => {
        return store.later(done => {
          setTimeout(() => {
            store.incrementBy(2)
            done()
          }, 10)
        })
      }
    }
  })

  expect(store.count).toEqual(0)

  await store.incrementDelayed()

  expect(store.count).toEqual(2)
})

run('Async updates can return an optional value', async (fallback, create) => {
  const store = create({
    state: {
      count: 0
    },
    update: {
      increment: state => {
        return ++state.count
      },
      incrementDelayed: (state, store) => {
        return store.later((done) => {
          setTimeout(() => {
            store.increment()
            done(2)
          }, 10)
        })
      }
    }
  })

  const { value } = await store.incrementDelayed()

  expect(value).toEqual(2)
  expect(store.count).toEqual(1)
})

run('Async updates return an error if fail is called', async (fallback, create) => {
  const store = create({
    state: {
      count: 0
    },
    update: {
      successful: (state, store) => {
        return store.later((done) => {
          setTimeout(() => {
            done()
          }, 10)
        })
      },
      successfulWithValue: (state, store, value) => {
        return store.later((done) => {
          setTimeout(() => {
            done(value)
          }, 10)
        })
      },
      failing: (state, store) => {
        return store.later((done, fail) => {
          setTimeout(() => {
            fail()
          }, 10)
        })
      },
      failingWithError: (state, store) => {
        return store.later((done, fail) => {
          setTimeout(() => {
            fail('Error World')
          }, 10)
        })
      },
    }
  })

  await expect(store.successful()).resolves.toEqual({})

  await expect(store.successfulWithValue(5)).resolves.toEqual({
    error: false,
    value: 5
  })

  await expect(store.failing()).rejects.toEqual({
    error: true
  })

  await expect(store.failingWithError()).rejects.toEqual({
    error: 'Error World'
  })
})
