export default () => ({
  state: {
    items: [
      'Apple'
    ]
  },
  update: {
    add: (state, store, value) => {
      state.items.push(value)
    }
  }
})
