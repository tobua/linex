import React, { Component } from 'react'
import ConnectedComponent from './ConnectedComponent'

export default class App extends Component {
  render() {
    return (
      <div>
        App
        <ConnectedComponent ID={'1'} />
        <ConnectedComponent ID={'2'} />
      </div>
    )
  }
}
