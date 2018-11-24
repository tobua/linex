import after from './utils/after'
import { create } from './..'

test('Calling a method will modify the state.', () => {
  const store = create({
    state: {
      count: 0
    },
    methods: {
      increment: (state) => {
        state.count = state.count + 1
      }
    }
  })

  store.increment()

  expect(store.count).toEqual(1)

  store.increment()

  expect(store.count).toEqual(2)
})

test('Values can be passed to methods.', () => {
  const store = create({
    state: {
      count: 0
    },
    methods: {
      incrementTo: (state, value) => {
        state.count = value
      }
    }
  })

  store.incrementTo(5)

  expect(store.count).toEqual(5)
})

test('Async actions will update the state immediately and upon delay.', () => {
  const store = create({
    state: {
      count: 0
    },
    methods: {
      incrementDelayed: (state, value, rootState, delay) => {
        state.count++

        setTimeout(() => {
          delay((delayedState, done) => {
              delayedState.count = delayedState.count + 2
              done()
          })
        }, 1000)
      }
    }
  })

  expect(store.count).toEqual(0)

  store.incrementDelayed()

  expect(store.count).toEqual(1)

  return after(2, () => {
    expect(store.count).toEqual(3)
  })
})

test('Async methods update the state after awaiting.', async () => {
  const store = create({
    state: {
      count: 0
    },
    methods: {
      delayed: (state, value, rootState, delay) => {
        setTimeout(() => {
          delay((delayedState, done) => {
            delayedState.count = delayedState.count + 2
            done()
          })
        }, 1000)
      }
    }
  })

  expect(store.count).toEqual(0)

  await store.delayed()

  expect(store.count).toEqual(2)
})

test('Async methods can return an optional value.', async () => {
  const store = create({
    state: {
      count: 0
    },
    methods: {
      delayed: (state, value, rootState, delay) => {
        setTimeout(() => {
          delay((state, done) => {
            state.count++
            done(5)
          })
        }, 1000)
      }
    }
  })

  const { value } = await store.delayed()

  expect(value).toEqual(5)
  expect(store.count).toEqual(1)
})

test('Async methods return an error if fail is called.', async () => {
  const store = create({
    state: {
      count: 0
    },
    methods: {
      successful: (state, value, rootState, delay) => {
        setTimeout(() => {
          delay((state, done) => {
            done()
          })
        }, 1000)
      },
      successfulWithValue: (state, value, rootState, delay) => {
        setTimeout(() => {
          delay((state, done) => {
            done(5)
          })
        }, 1000)
      },
      failing: (state, value, rootState, delay) => {
        setTimeout(() => {
          delay((state, done, fail) => {
            fail()
          })
        }, 1000)
      },
      failingWithError: (state, value, rootState, delay) => {
        setTimeout(() => {
          delay((state, done, fail) => {
            fail('Error World')
          })
        }, 1000)
      },
    }
  })

  await expect(store.successful()).resolves.toEqual({
    value: undefined
  })

  await expect(store.successfulWithValue()).resolves.toEqual({
    value: 5
  })

  await expect(store.failing()).rejects.toEqual({
    error: true
  })

  await expect(store.failingWithError()).rejects.toEqual({
    error: 'Error World'
  })
})
