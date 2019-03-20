import memoize from 'memoize-one'

// Inject state into method call.
const statify = (app, method) => () => method(app.state)

// Enhance read methods, so they can be properly called.
export default (app) => {
  Object.keys(app.read).forEach((property) => {
    const method = app.read[property]

    if (typeof method === 'function') {
      app.read[property] = statify(app, method)
    }

    if (Array.isArray(method) && method.length === 2) {
      const mapping = method[0]
      const logic = method[1]
      const memoized = memoize(logic)

      app.read[property] = (...inputs) => {
        const args = mapping(app.state)

        // TODO add object support for args, like mapToProps, currently [].

        const methodArgs = inputs.concat(args)

        return memoized.apply(null, methodArgs)
      }
    }
  })
}
