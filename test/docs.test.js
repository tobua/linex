import fetch from 'node-fetch'
import React from 'react'
import renderer from 'react-test-renderer'
import { get, Component } from 'linex'
import run from './utils/run'

run('Store with all kinds of features for documentation', async (fallback, create) => {
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
  expect(store.count).toEqual(0)
  // Update
  expect(store.increment()).toEqual(1)
  expect(store.count).toEqual(1)
  expect(store.incrementBy(2)).toEqual(3)
  expect(store.count).toEqual(3)
  // Read
  expect(store.double()).toEqual(6)
  expect(store.doubleMemoized()).toEqual(6)
  // Async Update
  const { value } = await store.incrementDelayed()
  expect(value).toEqual(4)
  expect(store.count).toEqual(4)
})

run('React integration simple case', (fallback, create) => {
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
  const testRenderer = renderer.create(<DisplayCount mapStore={mapStore} />)
  let json = testRenderer.toJSON()

  expect(json.children[0].children[0]).toEqual('0')

  testRenderer.root.findByType('button').props.onClick()

  json = testRenderer.toJSON()

  expect(json.children[0].children[0]).toEqual('1')
})

run('Nested store simple example', (fallback, create) => {
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

  expect(store.nested.count).toEqual(1)
  expect(get().nested.count).toEqual(1)
})
