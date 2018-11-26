import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { create, connect, Provider } from './linex'

const store = create({
  state: {
    count: 0,
    secondCount: 0
  },
  methods: {
    increment: (state) => {
      state.count = state.count + 1
    },
    incrementSecond: (state) => {
      state.secondCount = state.secondCount + 2
    }
  }
})

class BasicComponent extends React.Component {
  render() {
    const { id, count, increment } = this.props

    return (
      <p>{id}: {count} <button onClick={increment}>Increment</button></p>
    )
  }
}

const ConnectedBasicComponent = connect(store => {
  return {
    count: store.count,
    increment: () => store.increment()
  }
}, BasicComponent)

const AnotherConnectedBasicComponent = connect(store => {
  return {
    count: store.secondCount,
    increment: () => store.incrementSecond()
  }
}, BasicComponent)

const AppWithProvider = () => (
  <Provider store={store}>
    <div>
      <h1>Linex Example React App</h1>
      <ConnectedBasicComponent id='Connected to count' />
      <AnotherConnectedBasicComponent id='Connected to secondCount' />
      <ConnectedBasicComponent id='Connected to count' />
    </div>
  </Provider>
)

ReactDOM.render(<AppWithProvider />, document.getElementById('root'))
