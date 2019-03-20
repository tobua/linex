import { Component as ReactComponnt } from 'react'
import PropTypes from 'prop-types'
import link from './../link'

// Add new store to the component state.
function updateProps(nextStore) {
  this.setState(nextStore)
}

export default class Component extends ReactComponnt {
  constructor(props, context) {
    super(props, context)
    this.displayName = `Store${this.displayName}`
    const { mapStore } = props
    if (typeof mapStore !== 'function') return
    const { state, unsubscribe } = link(mapStore, updateProps.bind(this))
    this.state = state
    this.__unsubscribe = unsubscribe
  }

  mapStore(mapStore) {
    if (typeof mapStore !== 'function' || this.__unsubscribe) return
    const { state, unsubscribe } = link(mapStore, updateProps.bind(this))
    this.state = state
    this.__unsubscribe = unsubscribe
  }

  componentWillUnmount() {
    this.__unsubscribe()
  }
}

Component.propTypes = {
  mapStore: PropTypes.func
}
