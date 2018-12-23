import React, { Component } from 'react'

export default class Weather extends Component {
  componentWillMount() {
    this.props.weather.load()
  }

  render() {
    const { weather } = this.props

    if (!weather) {
      return <p>...</p>
    }

    if (weather.isLoading) {
      return <p>Is loading...</p>
    }

    if (weather.isError) {
      return <p>Error loading weather.</p>
    }

    return (
      <p>Weather: {weather.data}</p>
    )
  }
}
