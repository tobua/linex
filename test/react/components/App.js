import React from 'react'
import { Provider } from './../../..'

export default class App extends React.Component {
  render() {
    const { store, children } = this.props

    return (
      <Provider store={store}>
        <div>
          <h1>Linex App</h1>
          {children}
        </div>
      </Provider>
    )
  }
}
