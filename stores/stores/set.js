import { create } from 'linex'

export default (value) => create({
  state: {
    value: value
  },
  update: {
    set: (state, store, value) => (state.value = value)
  }
})
