import { create, connect } from './../..'

export default {
  state: {
    count: 0,
    secondCount: 0,
    deep: {
      count: 0
    },
    substore: create({
      state: {
        count: 0
      },
      methods: {
        increment: state => {
          state.count++
        }
      }
    })
  },
  methods: {
    increment: (state, value = 7) => {
      state.count = state.count + value
    },
    incrementDelayed: async (state, value, run) => {
      await delay()
      run('increment', 6)
    },
    incrementSecond: state => {
      state.secondCount++
    },
    incrementDeep: state => {
      state.deep.count++
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
