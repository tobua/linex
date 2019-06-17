import { model } from 'linex'

export default (initial = false) => model({
  state: {
    value: initial
  },
  update: {
    toggle: (state, store, value) => {
      if (typeof value === 'undefined') {
        return state.value = !state.value
      }
      return state.value = value
    }
  }
})
