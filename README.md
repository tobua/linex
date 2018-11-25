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
    incrementAsync(state, value, rootState, delay) => {
      setTimeout(() => delay(state => {
        state.count = state.count + 2
        done(state.count)
      }))
    }
    asyncInc: (state, value, rootState, delay) => {
      setTimeout(() => {
        delay((state, done, fail) => {
          state.count = state.count + 5
          done(state.count)
        })
      }, 1000)
    },
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
const { value } = await store.incrementAsync()  // store.count: 3, value: 2
const memoizedValue = store.double              // memoizedValue: 6
const { value, error } = await store.asyncInc() // store.count: 8, value: 8
```

## Usage with React

Comes with built-in helpers for React integration.

```
import React from 'react'

// TODO
```

## Development

```
npm start # Run build in watch mode
npm test # Run tests in watch mode
```
