import React from 'react'
import { Component } from 'linex'

export default class Toggle extends Component {
  render() {
    const { toggle, active } = this.state

    return (
      <p>Currently {active ? 'Active' : 'Inactive'} <button onClick={() => toggle()}>Toggle</button></p>
    )
  }
}
