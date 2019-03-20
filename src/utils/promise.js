import Polyfill from 'es6-promise'
import invariant from 'invariant'
import invariants from './../constants/invariants'

// Polyfill Promise, as it's also required by immer.
if (typeof Promise === 'undefined') {
  Promise = Polyfill.Promise
}

export default (app, method) => {
  invariant(method, invariants.laterCallback)

  return new Promise((resolve, reject) => {
    // Map resolve and reject to { ...values, error } object, that's simpler
    // to handle for the user.
    const done = (...values) => {
      // No argument passed to done()
      if (values.length === 0) {
        return resolve({})
      }

      // One argument passed to done like done(5), done([]) or done({})
      if (values.length === 1) {
        const value = values[0]

        if (typeof value === 'object' && !Array.isArray(value)) {
          return resolve({
            ...value,
            error: false
          })
        }

        return resolve({
          value,
          error: false
        })
      }

      // Several arguments passed to done(5, {}, [])
      resolve({
        value: values,
        error: false
      })
    }

    // Outputs { error: true } fail() or { error: error } for fail(error)
    const fail = (error = true) => reject({ error })

    // Bind the store to this and as thrid argument.
    method.call(app.store, done, fail, app.store)
  })
}
