import { create } from './..'

test('Store with all kinds of features for documentation.', async () => {
  const store = create({
    // Define the initial state.
    state: {
      count: 0
    },
    // Methods are used to update the state.
    methods: {
      increment: (state, value) => {
        state.count++
      },
      asyncIncrement: (state, value, rootState, delay) => {
        setTimeout(() => {
          delay((state, done, fail) => {
            state.count = state.count + 5
            done(state.count)
          })
        }, 1000)
      }
    },
    // Define selectors to get values derived from the state
    selectors: {
      double: [
        state => state.count,
        count => count * 2
      ]
    }
  })

  // State
  expect(store.count).toEqual(0)
  // Method
  store.increment()
  expect(store.count).toEqual(1)
  // Async Method
  const { value } = await store.asyncIncrement()
  expect(value).toEqual(6)
  expect(store.count).toEqual(6)
  // Selector
  expect(store.double()).toEqual(12)
})
