import { create } from 'linex'

export default (initial = 0) => create({
  state: {
    value: initial
  },
  update: {
    increment: (state, store, value) => {
      if (typeof value === 'undefined') {
        return ++state.value
      }
      return state.value += value
    },
    decrement: (state, store, value) => {
      if (typeof value === 'undefined') {
        return --state.value
      }
      return state.value -= value
    }
  }
})
