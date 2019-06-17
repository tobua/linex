// Connects a change handler to the store.
export { default as link } from './link'
// Directly connects a React Component, when setting a mapStore prop.
export { default as Component } from './react/Component'
// Connects a Component by means of wrapping it in a HOC.
export { default as connect } from './react/connect'
// get() returns the root store, set(store) overrides the root store.
export { get, set } from './utils/store'
// options() can be used to set options, shared between all create() calls.
export { default as options } from './utils/options'

import { set } from './utils/store'
import proxy from './proxy'
import verify from './verify'
import initialize from './initialize'

// create({ state, update, read }, options) initializes and returns a store.
// The last call to create defines the root, accessible anywhere with get().
export const create = (...args) => {
  const app = initialize(verify(args))
  const {
    state,      // Stores the current state.
    update,     // Used to make changes to the state.
    read,       // Derive values from the state, optionally memoized.
    plugin,     // Called when the state changes or the store is accessed.
    options     // Options, including fallback for object in IE11.
  } = app

  // Use Proxy if available, otherwise creates an object fallback.
  return set(app.store = proxy(app))
}

// Same as create, but will not set the store as root.
export const model = (...args) => {
  const app = initialize(verify(args))
  return app.store = proxy(app)
}
