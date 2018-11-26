export default productsStore => ({
  state: {
    // Products has it's own substore.
    products: productsStore,
    type: 'Fruits'
  },
  methods: {
    changeType: (state, value) => {
      state.type = value
    }
  }
})
