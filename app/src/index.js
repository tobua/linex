import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import simux, { Provider } from 'simux'

console.log(simux)

const store = simux.default({
  state: {},
  methods: {},
  selectors: {}
})

const AppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<AppWithProvider />, document.getElementById('root'))
