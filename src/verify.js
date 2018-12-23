import invariant from 'invariant'
import has from 'lodash.has'
import isObject from 'is-object'

export default (args) => {
  // TODO warn if keys aren't unique in DEV mode.
  invariant(args.length >= 1, 'At least one argument needs to be passed.')
  invariant(typeof args[0] === 'object', 'An object needs to be passed as the first argument.')

  const input = args[0]
  const root = args[1]

  invariant(
    has(input, 'state') || has(input, 'hooks'),
    'A state or hooks property is required on the first argument.'
  )

  const state = input.state || {}

  invariant(isObject(state), 'state needs to be an object.')

  const hooks = input.hooks || {}

  invariant(isObject(hooks), 'hooks needs to be an object.')

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
    hooks,
    methods,
    selectors,
    middleware,
    root,
    fallback
  }
}
