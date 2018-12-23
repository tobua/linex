import produce from 'immer'
import has from 'lodash.has'
import PromisePolyfill from './utils/promise'

export default (app, name) => {
  return (value) => {
    let done, fail

    Object.keys(app.middleware).forEach(
      middlewareKey => app.middleware[middlewareKey](name)
    )

    const Promise = PromisePolyfill()

    const promise = new Promise((resolve, reject) => {
      done = resolve
      fail = reject
    })

    const delay = method => app.setState(
      produce(app.getState(), draft => method(
        draft,
        (value) => done({
          value
        }),
        (error = true) => fail({
          error
        })
      ))
    )

    app.setState(
      produce(
        app.getState(),
        draft => app.methods[name](
          draft, value, Object.freeze(app.root()), delay)
      )
    )

    return promise
  }
}
