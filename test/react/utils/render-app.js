import React from 'react'
import renderer from 'react-test-renderer'
import App from './../components/App'

/**
 * Renders an App wrapping the children.
 **/
export default children => {
  return renderer.create(
    <App>
      {children}
    </App>
  )
}
