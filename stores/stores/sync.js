import { model } from 'linex'

export default (initial, sync) => {
  const store = model({
    state: {
      value: initial,
      synced: false,
      error: false
    },
    update: {
      set: (state, store, value) => {
        state.value = value
        state.synced = false
        state.error = false
        sync(initial).then(() => store._sync()).catch(() => store._error())
        return value
      },
      _sync: state => (state.synced = true),
      _error: state => (state.error = true)
    }
  })

  sync(initial).then(() => store._sync()).catch(() => store._error())

  return store
}
