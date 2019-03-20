import invariant from 'invariant'
import isObject from 'is-object'
import invariants from './constants/invariants'
import unique from './utils/unique'

export default (args) => {
  if (process.env.NODE_ENV !== 'production') {
    invariant(args.length >= 1, invariants.oneArgumentMinimum)
    invariant(typeof args[0] === 'object', invariants.firstObject)
  }

  const input = args[0] || { state: {} }
  const options = args[1] || {}

  if (process.env.NODE_ENV !== 'production') {
    invariant(typeof input.state !== 'undefined', invariants.stateRequired)
  }

  const state = input.state || {}

  const update = input.update || {}

  const read = input.read || {}

  const plugin = input.plugin || {}

  if (typeof Proxy === 'undefined') {
    options.fallback = true
  }

  if (process.env.NODE_ENV !== 'production') {
    invariant(isObject(state), invariants.stateObject)
    invariant(isObject(update), invariants.updateObject)
    invariant(isObject(read), invariants.readObject)
    invariant(isObject(plugin), invariants.pluginObject)
    invariant(
      typeof options.fallback === 'undefined' ||
      typeof options.fallback === 'boolean', invariants.fallbackBoolean)
    // Properties should be unique.
    unique(state, read, update)
  }

  return {
    state,
    update,
    read,
    plugin,
    options
  }
}
