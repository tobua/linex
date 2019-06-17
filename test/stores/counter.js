export default model => ({
  state: {
    count: 0,
    secondCount: 0,
    deep: {
      count: 0
    },
    anotherStore: model({
      state: {
        count: 0
      },
      update: {
        increment: state => {
          state.count++
        }
      }
    })
  },
  update: {
    increment: (state, store, value = 7) => {
      state.count = state.count + value
    },
    incrementSecond: state => {
      state.secondCount++
    },
    incrementDeep: state => {
      state.deep.count++
    }
  },
  read: {
    doubleCount: [
      state => [state.count],
      count => (count * 2)
    ]
  },
  plugin: {
    log: (state, type, action) => {
      console.log('log: ', type, action)
    }
  }
})
