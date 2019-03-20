import '@babel/polyfill/dist/polyfill' // '@babel/polyfill' won't work in rollup.
import 'whatwg-fetch'
import React from 'react'
import { render } from 'react-dom'
import { create, Component } from 'linex'
import { store as quoteStore, Quote } from './Quote'
import prepareDocument from './document'

create({
  state: {
    count: 1,
    secondCount: 2,
    quote: quoteStore
  },
  update: {
    increment: state => {
      state.count++
    },
    incrementSecond: state => {
      state.secondCount = state.secondCount + 2
    }
  },
  read: {
    totalCount: [
      store => ([store.count, store.secondCount]),
      (count, secondCount) => (count + secondCount)
    ]
  }
})

class Counter extends Component {
  render() {
    const { id } = this.props
    const { count } = this.state

    return (
      <p>{id}: {count}</p>
    )
  }
}

Counter.displayName = 'Counter'

class Increment extends Component {
  render() {
    const { id } = this.props
    const { increment } = this.state

    return (
      <p>{id}: <button onClick={increment}>Increment</button></p>
    )
  }
}

Increment.displayName = 'Increment'

const App = () => (
  <div>
    <h1>Linex Example React App</h1>
    <h2>State</h2>
    <Counter
      id='Connected to count'
      mapStore={store => ({
        count: store.count
      })}
    />
    <Counter
      id='Connected to secondCount'
      mapStore={store => ({
        count: store.secondCount
      })}
    />
    <h2>Update</h2>
    <Increment
      id='Increments count'
      mapStore={store => ({
        increment: store.increment
      })}
    />
    <Increment
      id='Increments secondCount'
      mapStore={store => ({
        increment: store.incrementSecond
      })}
    />
    <h2>Read</h2>
    <Counter
      id='Connected to totalCount (memoized)'
      mapStore={store => ({
        count: store.totalCount()
      })}
    />
    <h2>Async</h2>
    <Quote
      mapStore={store => ({
        quote: store.quote,
        data: store.quote.data
      })}
    />
  </div>
)

App.displayName = 'App'

prepareDocument()

render(<App />, document.querySelector('#root'))
