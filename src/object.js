import removeArrayItem from 'remove-array-item'
import run from './run'
import hook from './hook'

export default app => {
  // Fallback to regular object.
  const store = assign({}, app.state)

  Object.keys(app.methods).forEach(key => {
    store[key] = value => run(app, key)(value)
  })

  Object.keys(app.selectors).forEach(key => {
    store[key] = () => app.selectors[key](app.state)
  })

  store.subscribe = handler => app.subscribers.push(handler)
  store.unsubscribe = handler => (
    app.subscribers = removeArrayItem(app.subscribers, handler))
  store.root = app.root && app.root()
  store.__fallback = true

  return store
}
