export default productsStore => ({
  state: {
    // Products has it's own substore.
    products: productsStore,
    type: 'Fruits'
  },
  update: {
    changeType: (state, store, value) => {
      state.type = value
    }
  }
})
