import produce from 'immer'
import has from 'lodash.has'

export default (methods, state, update, key, middleware) => {
  return (value) => {
    Object.keys(middleware).forEach(
      middlewareKey => middleware[middlewareKey](key)
    )

    update(produce(state, methods[key].bind(this, value)))
  }
}
