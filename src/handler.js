import has from 'lodash.has'
import removeArrayItem from 'remove-array-item'
import traps from './traps'
import run from './run'
import hook from './hook'

// Return another proxy if object accessed and the result otherwise.
const accessOrRedirect = (target, name, app) => {
  const result = target[name]

console.log(typeof name === 'symbol')
  if (typeof name === 'symbol') {
    console.log(typeof target, 'in')
    return 'hey'
  }

  // Recursively return another proxy, to access nested values.
  if (typeof result === 'object') {
    // Proxy only created upon first access.
    target[name] = new Proxy(result, traps(app))
    return target[name]
  }

  return result
}

// Handlers that decide which action to perform when the store is accessed.

// The following can also apply when nested.
export const lowerLevel = (app, name, target) => {
  console.log('lower', name, target)
  let result

  if (result = accessOrRedirect(target || app.state, name, app)) {
    console.log('return state')
    return result
  }

  if (result = accessOrRedirect(target || app.methods, name, app)) {
    console.log('return method')
    return result
  }

  if (result = accessOrRedirect(target || app.hooks, name, app)) {
    console.log('return hook')
    return hook(app, name)
  }

  if (result = accessOrRedirect(target || app.selectors, name, app)) {
    console.log('return selector')
    return () => app.selectors[name](state)
  }

  console.warn(`The property ${name} does not exist on the store.`)
}

// These functionalities are only available on the first-level.
export const topLevel = (app, name, target) => {
  if (name === 'subscribe') {
    return handler => app.subscribers.push(handler)
  }

  if (name === 'unsubscribe') {
    return handler => {
      app.subscribers = removeArrayItem(app.subscribers, handler)
    }
  }

  if (name === 'root') {
    return app.root()
  }

  // Needed to check whether root is available.
  if (name === 'hasOwnProperty') {
    return () => true // NOTE Could return actual result.
  }

  // Needed for React Dev Tools
  if (name === '@@toStringTag') {
    return 'Linex Store'
  }

  if (name === '_reactFragment') {
    return {}
  }

  console.log('lower')

  // Lower level handler also applies to top-level, but not the other way.
  return lowerLevel(app, name, target)
}
