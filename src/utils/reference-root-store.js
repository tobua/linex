export default (state, store) => {
  const enhanceKeys = (currentState, depth) => {
    if (depth > 3) {
      return
    }

    Object.keys(currentState).forEach(key => {
      const possibleStore = currentState[key]

      if (
        typeof possibleStore === 'object' &&
        possibleStore.hasOwnProperty('__rootStore')
      ) {
        possibleStore.__rootStore(store)
        enhanceKeys(possibleStore, depth + 1)
      }
    })
  }

  // Recursively travel state to look for substore and add a root reference.
  enhanceKeys(state, 0)

  return state
}
