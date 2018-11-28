import has from 'lodash.has'
export { default as Provider } from './Provider'
export { default as connect } from './connect'
import run from './run'
import verify from './verify'
import initialize from './initialize'
import assign from './utils/assign'

export const create = (...args) => {
  let {
    state,
    methods,
    selectors,
    middleware,
    root,
    store,
    fallback
  } = initialize(verify(args))

  // Subscribers will be called when the state updates.
  const subscribers = []

  const getState = () => state

  const setState = newState => {
    state = newState

    if (fallback) {
      assign(store, newState)
    }

    // Inform subscribers about the state change.
    subscribers.forEach(subscriber => subscriber(store))
  }

  if (!fallback) {
    store = new Proxy({}, {
      get: (target, name) => {
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
          return () => selectors[name](state)
        }

        // Needed for React Dev Tools
        if (name === '@@toStringTag') {
          return 'Linex Store'
        }

        if (name === '_reactFragment') {
          return {}
        }

        console.warn(`The property ${name} does not exist on the store.`)
      },
      set: (target, name, value) => {
        console.warn('Please use methods to update the state.')

        return true
      }
    })
  } else {
    // Fallback to regular object.
    store = assign({}, state)

    Object.keys(methods).forEach(key => {
      store[key] = (value) => run(
        methods,
        getState,
        setState,
        key,
        middleware
      )(value)
    })

    Object.keys(selectors).forEach(key => {
      store[key] = () => selectors[key](state)
    })

    store.subscribe = value => subscribers.push(value)
    store.__rootStore = rootStore => root = rootStore
    store.__fallback = true
  }

  return store
}
