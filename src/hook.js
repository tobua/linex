import produce from 'immer'

export default (app, name) => {
  console.log('hook.js', name)
  // Return value, if it's not a method.
  if (typeof app.hooks[key] !== 'function') {
    return app.hooks[key]
  }

  console.log('passed')

  return value => {
    console.log('hook', value, app.getState());
    Object.keys(app.middleware).forEach(
      middlewareKey => app.middleware[middlewareKey](name)
    )

    app.setState(
      produce(
        app.getState(),
        storeState => {
          storeState.type = produce(
            app.getState().type,
            state => app.hooks[name](
              state,
              value,
              storeState,
              Object.freeze(app.root())
            )
          )
        }
      )
    )
  }
}
