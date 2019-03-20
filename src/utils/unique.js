import invariants from './../constants/invariants'

// Check if update/read properties are unique and warn otherwise.
export default (state, read, update) => {
  // Update either on read or state.
  Object.keys(update).forEach(key => {
    if (typeof read[key] !== 'undefined') {
      console.warn(invariants.updateOnRead(key))
    }
    if (typeof state[key] !== 'undefined') {
      console.warn(invariants.keyOnState(key))
    }
  })

  // Read on state, on update already checked before, as two-way.
  Object.keys(read).forEach(key => {
    if (typeof state[key] !== 'undefined') {
      console.warn(invariants.keyOnState(key))
    }
  })
}
