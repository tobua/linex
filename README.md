# Linex

Refined State Management, pronounced as /ˈlɪnəks/.

## Installation

```
npm i linex
```

## Features

* Methods (Actions)
* Effortless Immutability
* Async Methods
* Selectors
* Middleware
* IE11 Support
* Only 3.9 Kb
* React Integration with Provider and connect

## Standalone Usage

```
import { create } from 'linex'

const store = create({
  // Define the initial state.
  state: {
    count: 0
  },
  // Methods are used to update the state.
  methods: {
    increment: (state, value) => {
      state.count++
    },
    asyncIncrement: (state, value, rootState, delay) => {
      setTimeout(() => {
        delay((state, done, fail) => {
          state.count = state.count + 5
          done(state.count)
        })
      }, 1000)
    }
  },
  // Define selectors to get values derived from the state
  selectors: {
    double: [
      state => state.count,
      count => count * 2
    ]
  }
})

store.count                                     // store.count: 0
store.increment()                               // store.count: 1
const { value } = await store.asyncIncrement()  // store.count: 6, value: 6
const memoizedValue = store.double()            // memoizedValue: 12
```

## Usage with React

Comes with built-in helpers for React integration.

```
import React from 'react'
import ReactDOM from 'react-dom'
import { create, connect, Provider } from 'linex'

const store = create({
  state: {
    count: 0
  }
})

function BasicComponent({ count }) {
  return <p>{count}</p>
}

const ConnectedBasicComponent = connect(store => ({
  count: store.count
}), BasicComponent)

const AppWithProvider = () => (
  <Provider store={store}>
    <ConnectedBasicComponent />
  </Provider>
)

ReactDOM.render(<AppWithProvider />, document.getElementById('root'))
```

## Development

```
npm start # Run build in watch mode
npm test # Run tests in watch mode
```
