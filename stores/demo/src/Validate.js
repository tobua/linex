import React from 'react'
import { Component } from 'linex'

export default class Validate extends Component {
  render() {
    const { value, set, error } = this.state

    return (
      <div>
        <input value={value} onChange={event => set(event.target.value)} />
        <p>Is {error ? 'NOT' : ''} an adult.</p>
      </div>
    )
  }
}
