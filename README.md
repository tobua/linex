# Linex

Refined State Management, pronounced as /ˈlɪnəks/.

## Installation

```
npm i linex
```

## Usage

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
      }))
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
```

## Development

```
npm start # Run build in watch mode
npm test # Run tests in watch mode
```
