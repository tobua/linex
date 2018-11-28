import invariant from 'invariant'
import has from 'lodash.has'
import isObject from 'is-object'

export default (args) => {
  // TODO warn if keys aren't unique.
  invariant(args.length === 1, 'At least one argument needs to be passed.')
  invariant(typeof args[0] === 'object', 'An object needs to be passed as the first argument.')

  const input = args[0]

  invariant(has(input, 'state'), 'A state property is required on the first argument.')

  const state = input.state

  invariant(isObject(state), 'state needs to be an object.')

  const methods = input.methods || {}

  invariant(isObject(methods), 'methods needs to be an object.')

  const selectors = input.selectors || {}

  invariant(isObject(selectors), 'selectors needs to be an object.')

  const middleware = input.middleware || {}

  invariant(isObject(middleware), 'middleware needs to be an object.')

  const fallback = input.fallback || typeof Proxy === 'undefined' || false

  invariant(typeof fallback === 'boolean', 'fallback should be a boolean value.')

  return {
    state,
    methods,
    selectors,
    middleware,
    fallback
  }
}
