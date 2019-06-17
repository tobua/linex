import { model } from 'linex'

export default (value) => model({
  state: {
    value: value
  },
  update: {
    set: (state, store, value) => (state.value = value)
  }
})
