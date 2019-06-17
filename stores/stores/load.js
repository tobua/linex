import { model } from 'linex'

export default (doImport) => model({
  state: {
    Component: null,
    loading: false,
    loaded: false,
    error: false
  },
  update: {
    load: (state, store) => {
      state.loading = true
      store.later((done, fail) => {
        doImport()
        .then(Component => {
          if (Component) {
            store._receive(Component.default || Component)
          }
          done()
        })
        .catch(error => store._error())
      })
    },
    _receive: (state, store, Component) => {
      state.loading = false
      state.loaded = true
      state.Component = Component
    },
    _error: state => {
      state.loading = false
      state.error = true
    }
  }
})
