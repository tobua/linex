import { model } from 'linex'

export default (initial, valid, warning = () => false) => model({
  state: {
    value: initial,
    valid: valid(initial),
    error: !valid(initial),
    warning: warning(initial)
  },
  update: {
    set: (state, store, value) => {
      const isValid = valid(value)
      state.valid = isValid
      state.error = !isValid
      state.warning = warning(value)
      state.value = value
      return value
    }
  }
})
