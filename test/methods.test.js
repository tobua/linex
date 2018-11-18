import { create } from './..'

test('Calling a method will modify the state.', () => {
  const store = create({
    state: {
      count: 0
    },
    methods: {
      increment: (value, state) => {
        state.count = state.count + 1
      }
    }
  })

  store.increment()

  expect(store.count).toEqual(1)

  store.increment()

  expect(store.count).toEqual(2)
})

test('A value can be passed to increment.', () => {
  const store = create({
    state: {
      count: 0
    },
    methods: {
      incrementTo: (value, state) => {
        state.count = value
      }
    }
  })

  store.incrementTo(5)

  expect(store.count).toEqual(5)
})
