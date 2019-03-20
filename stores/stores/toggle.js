import { create } from 'linex'

export default (initial = false) => create({
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
