import produce from 'immer'
import has from 'lodash.has'
import PromisePolyfill from './utils/promise'

export default (methods, getState, setState, key, middleware) => {
  return (value) => {
    let done, fail

    Object.keys(middleware).forEach(
      middlewareKey => middleware[middlewareKey](key)
    )

    const Promise = PromisePolyfill()

    const promise = new Promise((resolve, reject) => {
      done = resolve
      fail = reject
    })

    const delay = method => setState(
      produce(getState(), draft => method(
        draft,
        (value) => done({
          value
        }),
        (error = true) => fail({
          error
        })
      ))
    )

    setState(
      produce(
        getState(),
        draft => methods[key](draft, value, {}, delay)
      )
    )

    return promise
  }
}
