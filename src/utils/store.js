import removeArrayItem from 'remove-array-item'
import invariants from './../constants/invariants'

// Stores a reference to the root store.
let root

// Handler functions connected to the store, notified on every change.
let subscribers = []
// Add handler to subscribers.
export const subscribe = handler => subscribers.push(handler)
// Remove subscribed handler.
export const unsubscribe = handler => (
  subscribers = removeArrayItem(subscribers, handler))
// Notifies subscribers about the new state.
export const notify = () => subscribers.forEach(subscriber => subscriber(root))

// Exposes the root store globally.
export const get = () => root

// Inject existing store.
export const set = store => {
  if (process.env.NODE_ENV !== 'production' && root) {
    console.warn(invariants.severalRoots)
  }

  return root = store
}
