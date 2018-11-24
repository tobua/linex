import React from 'react'
import renderer from 'react-test-renderer'
import App from './../components/App'

/**
 * Renders an App with a store and the children.
 **/
export default (store, children) => {
  return renderer.create(
    <App store={store}>
      {children}
    </App>
  )
}
