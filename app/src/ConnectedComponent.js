import React, { Component } from 'react'
import { connect } from 'simux'

class ConnectedComponent extends Component {
  render() {
    const { ID, test } = this.props

    return (
      <div>
        ConnectedComponent: {ID} {test}
      </div>
    )
  }
}

export default connect({}, ConnectedComponent)
