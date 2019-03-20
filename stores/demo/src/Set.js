import React from 'react'
import { Component } from 'linex'

export default class Set extends Component {
  constructor(props) {
    super(props)

    this.state.currentValue = this.state.value
  }

  render() {
    const { set, value, currentValue } = this.state

    return (
      <div>
        <input value={currentValue} onChange={event => this.setState({
          currentValue: event.target.value
        })} />
        <button onClick={() => set(currentValue)}>Set Value</button>
        <p>Value: {value}</p>
      </div>
    )
  }
}
