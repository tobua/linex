import has from 'lodash.has'
export { default as Provider } from './Provider'
export { default as connect } from './connect'
import run from './run'
import verify from './verify'
import initialize from './initialize'

export const create = (...args) => {
  let {
    state,
    methods,
    selectors,
    middleware,
    root,
    store
  } = initialize(verify(args))

  // Subscribers will be called when the state updates.
  const subscribers = []

  const getState = () => state

  const setState = newState => {
    state = newState
    // Inform subscribers about the state change.
    subscribers.forEach(subscriber => subscriber(store))
  }

  store = new Proxy({}, {
    get(target, name) {
      if (name === 'subscribe') {
        return value => subscribers.push(value)
      }

      if (name === '__rootStore') {
        return rootStore => root = rootStore
      }

      if (name === 'hasOwnProperty') {
        // Needed to check whether __rootStore is available.
        return () => true
      }

      if (has(state, name)) {
        return state[name]
      }

      if (has(methods, name)) {
        return run(methods, getState, setState, name, middleware)
      }

      if (has(selectors, name)) {
        return selectors[name](state)
      }

      console.warn(`The property ${name} does not exist on the store.`)
    },
    set(target, name, value) {
      console.warn('Please use methods to update the state.')

      return true
    }
  })

  return store
}
