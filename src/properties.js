import promise from './utils/promise'
import { subscribe, unsubscribe } from './utils/store'

// Add constants properties to the top-level target.
export default (app) => {
  const properties = {}
  properties.subscribe = subscribe
  properties.unsubscribe = unsubscribe
  // Needed to check whether root is available.
  properties.hasOwnProperty = () => true // NOTE Could return actual result.
  // Needed for React Dev Tools
  properties['@@toStringTag'] = 'Linex Store'
  properties._reactFragment = {}

  // Async Helpers
  properties.later = method => {
    return promise(app, method)
  }

  return properties
}
