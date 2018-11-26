export default {
  state: {
    items: [
      'Apple'
    ]
  },
  methods: {
    add: (state, value) => {
      state.items.push(value)
    }
  }
}
