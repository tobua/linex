export { default as Provider } from './Provider'
export { default as connect } from './connect'
export { default as set } from './hooks/set'
import proxy from './proxy'
import object from './object'
import verify from './verify'
import initialize from './initialize'
import assign from './utils/assign'

export const create = (...args) => {
  const app = initialize(verify(args))
  const {
    state,      // Stores the current state.
    methods,    // Used to make changes to the state.
    hooks,      // Ready-made utilities that combine state and methods.
    selectors,  // Derive values from the state, only recalculated on changes.
    middleware, // Called when methods or hooks update the state.
    root,       // Optional reference to the root store, if it's a nested store.
    getState,   // Returns an up-to-date reference to the state.
    getHooks,   // References the hook-state.
    setState,   // Update the state, will inform subscribers.
    setHooks,   // Same for hooks.
    fallback,   // Should an object-fallback be used instead of a proxy (IE11).
    store       // Exported reference, used to access functionalities above.
  } = app

  if (!app.fallback) {
    // Use Proxy if available, possible setter support in the future.
    app.store = proxy(app)
  } else {
    // Export regular object with the same API for IE11.
    app.store = object(app)
  }

  return app.store
}
