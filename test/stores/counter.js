export default {
  state: {
    count: 0
  },
  methods: {
    increment: (state, value = 7) => {
      console.log('method: increment', value)
      state.count = state.count + value
    },
    incrementDelayed: async (state, value, run) => {
      await delay()
      run('increment', 6)
    }
  },
  selectors: {
    doubleCount: [
      state => state.count,
      count => (count * 2)
    ]
  },
  middleware: {
    log: (state, type, action) => {
      console.log('log: ', type, action)
    }
  }
}
