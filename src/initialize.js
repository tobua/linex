import createSelectors from './utils/create-selectors'

export default (app) => {
  app.selectors = createSelectors(app.selectors, app.state)
  app.subscribers = []

  // Getters
  app.getState = () => app.state
  app.getHooks = () => app.hooks

  // Setters
  app.setState = newState => {
    app.state = newState

    if (app.fallback) {
      assign(app.store, newState)
    }

    // Inform subscribers about the state change.
    app.subscribers.forEach(subscriber => subscriber(app.store))
  }

  app.setHooks = newHooks => {
    app.hooks = newHooks

    if (app.fallback) {
      assign(store, newHooks)
    }

    // Inform subscribers about the hooks state change.
    app.subscribers.forEach(subscriber => subscriber(app.store))
  }

  // When no root available, reference self.
  if (!app.root) {
    app.root = () => app.store
  }

  return app
}
