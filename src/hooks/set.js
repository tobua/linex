export default value => {
  return {
    value,
    set: (state, value, storeState, rootStore) => {
      console.log('inside set', state, value);
      // state.value = value
    }
  }
}
