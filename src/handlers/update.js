import produce from 'immer'
import assign from 'object-assign'
import { notify } from './../utils/store'
import { getOptions } from './../utils/options'

// Calls the upadte method with the store and the values.
const callMethod = (app, state, method, inputs) => {
  const staticArgs = [state, app.store]
  const methodArgs = [].slice.call(staticArgs).concat(inputs)
  return method.apply(app.store, methodArgs)
}

export default app => {
  return {
    target: app.update,
    handler: (inputs, state, method, path, type) => {
      if (type === 'read') {
        // In this case the method is the value being accessed.
        return method
      }

      // If there is an existing draft state, use this one directly.
      if (app.draft) {
        return callMethod(app, app.draft, method, inputs)
      }

      let returnValue
      // Allow for quick reference swap later with Object.assign()
      const nextState = produce(state, state => {
        // Store draft, in case other calls on the same store are made.
        app.draft = state
        returnValue = callMethod(app, state, method, inputs)
        // Revoke draft.
        app.draft = null
      })

      // Shallow assign, to switch references.
      assign(state, nextState)
      // In proxy mode only assign to proxy target, not the proxy itself.
      if (getOptions().fallback) {
        assign(app.store, nextState)
      }

      // Inform subscribers about the state change.
      notify()

      return returnValue
    }
  }
}
