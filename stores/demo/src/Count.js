import React from 'react'
import { Component } from 'linex'

export default class Count extends Component {
  render() {
    const { value, increment, decrement } = this.state

    return (
      <div>
        <p>Counter {value}</p>
        <button onClick={() => increment()}>Increment</button>
        <span>&nbsp;</span>
        <button onClick={() => decrement()}>Decrement</button>
      </div>
    )
  }
}
