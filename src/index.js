import has from 'lodash.has'
export { default as Provider } from './Provider'
export { default as connect } from './connect'
import run from './run'
import verify from './verify'
import initialize from './initialize'

export const create = (...args) => {
  let { state, methods, selectors, middleware } = initialize(verify(args))

  const getState = () => state

  const setState = (newState) => (state = newState)

  return new Proxy({}, {
    get(target, name) {
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
    }
  })
}
