# Linex

Refined State Management, pronounced as /ˈlɪnəks/.

## Installation

```
npm i linex
```

## Features

* Read State (Selectors)
* Update State (Actions)
* Effortless Immutability
* Async Side-Effects
* Memoized Reads
* Plugins (Middleware)
* React Integration
* IE11 Support
* [Reusable Stores](https://github.com/naminho/linex/tree/master/stores)

## Standalone Usage

```js
import { create } from 'linex'

const store = create({
  // Define the initial state.
  state: {
    count: 0
  },
  // Used to update the state.
  update: {
    increment: state => ++state.count,
    incrementBy: (state, store, value) => state.count += value,
    incrementDelayed: (state, store) => {
      return store.later((done) => {
        setTimeout(() => done(store.increment()), 1000)
      })
    }
  },
  // Methods to get values derived from the state.
  read: {
    double: state => state.count * 2,
    doubleMemoized: [
      state => state.count,
      count => count * 2
    ]
  }
})

// State
store.count                                          // => 0, store.count: 0
// Update
store.increment()                                    // => 1, store.count: 1
store.incrementBy(2)                                 // => 3, store.count: 3
// Read
store.double()                                       // => 6
// Memoized Read, only called once if props stay the same.
store.doubleMemoized()                               // => 6
store.doubleMemoized()                               // => 6, but from cache.
// Async Update
const { value } = await store.incrementDelayed()     // store.count: 4, value: 4
```

## Usage with React

Comes with built-in helpers for React integration.

```js
import React from 'react'
import { render } from 'react-dom'
import { create, Component } from 'linex'

const store = create({
  state: { count: 0 },
  update: {
    increment: state => ++state.count
  }
})

class DisplayCount extends Component {
  render() {
    const { count, increment } = this.state

    return (
      <div>
        <p>{count}</p>
        <button onClick={() => increment()}>Increment</button>
      </div>
    )
  }
}

const mapStore = store => ({ count: store.count, increment: store.increment })

render(<DisplayCount mapStore={mapStore} />, document.getElementById('root'))
```

## Nested Stores

It's possible to split up sub-parts of the state into separate stores. The last
call to create automatically denotes the root store that can be accessed from
anywhere with get().

```js
import { create, get } from 'linex'

const store = create({
  state: {
    count: 0,
    nested: create({
      state: {
        count: 1
      }
    })
  }
})

store.nested.count // => 1
get().nested.count // => 1
```
