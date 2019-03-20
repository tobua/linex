import isEqual from 'react-fast-compare'
import { get } from './utils/store'

// Attaches a change handler to the store that's called on
export default (mapStore, change) => {
  const store = get()

  if (!store) {
    return console.warn('A store needs to be create()ed before link()ing to it.')
  }

  let state = mapStore(store)

  // Called on state updates.
  const handler = currentStore => {
    const nextState = mapStore(currentStore)
    // Change handler should only be called if any of the properties change.
    if (!isEqual(state, nextState)) {
      change(nextState)
      state = nextState
    }
  }

  // Subscribe to the store to be notified on state updates.
  store.subscribe(handler)

  // Return state and unsubscribe function.
  return {
    state,
    unsubscribe: () => store.unsubscribe(handler)
  }
}
