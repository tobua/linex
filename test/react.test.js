import React from 'react'
import renderer from 'react-test-renderer'

let BasicComponent
let renderMock

beforeEach(() => {
  renderMock = jest.fn()
  class ShouldRender extends React.Component {
    render() {
      renderMock()
      return (
        <p>test</p>
      )
    }
  }

  BasicComponent = ShouldRender
})

test('React component is rendered.', () => {
  const component = renderer.create(<BasicComponent />)
  let tree = component.toJSON()

  // console.log(component.getInstance())
  // console.log('tree', tree)
  // console.log('props', tree.props)

  expect(true).toBe(true)
})

test('render function is called only once for regular render.', () => {
  renderer.create(<BasicComponent />)
  expect(renderMock.mock.calls.length).toBe(1)
})
