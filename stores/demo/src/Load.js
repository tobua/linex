import React from 'react'
import { Component } from 'linex'

export default class Load extends Component {
  render() {
    const { Component, loading, loaded, load } = this.state

    if (!loaded && !loading) {
      return <button onClick={load}>Load</button>
    }

    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <Component />
    )
  }
}
