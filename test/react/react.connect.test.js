import renderRegularComponent from './utils/render-regular-component'
import getRenderProp from './utils/get-render-prop'

beforeEach(() => {
  // Hide logs from test console.
  console.warn = () => {}
  // Hide plugin output.
  console.log = () => {}
})

test('A component can be connected and will receive the props.', () => {
  const { renderMock } = renderRegularComponent()

  expect(renderMock.mock.calls.length).toBe(1)
  expect(getRenderProp(renderMock, 0)).toBe(0)
})

test('Several props can be connected.', () => {
  const mapToProps = state => ({
    count: state.count,
    secondCount: state.secondCount
  })

  const { renderMock, store } = renderRegularComponent(mapToProps)

  expect(getRenderProp(renderMock, 0)).toBe(0)
  expect(getRenderProp(renderMock, 0, state => state.secondCount)).toBe(0)

  store.increment(undefined)

  expect(getRenderProp(renderMock, 1)).toBe(7)

  store.incrementSecond()

  expect(getRenderProp(renderMock, 2, state => state.secondCount)).toBe(1)
})

test('The component is only rerendered if connected props change.', () => {
  const { renderMock, store } = renderRegularComponent()

  expect(renderMock.mock.calls.length).toBe(1)

  store.increment(undefined)

  expect(renderMock.mock.calls.length).toBe(2)

  store.incrementSecond()

  // Incrementing the second count shouldn't cause a rerender.
  expect(renderMock.mock.calls.length).toBe(2)
})

test('Nested values and stores can also be connected.', () => {
  const mapToProps = store => ({
    count: store.count,
    secondCount: store.secondCount,
    deepCount: store.deep.count,
    anotherStoreCount: store.anotherStore.count
  })

  const { renderMock, store } = renderRegularComponent(mapToProps)

  expect(getRenderProp(renderMock, 0)).toBe(0)
  expect(getRenderProp(renderMock, 0, store => store.secondCount)).toBe(0)
  expect(getRenderProp(renderMock, 0, store => store.deepCount)).toBe(0)
  expect(getRenderProp(renderMock, 0, store => store.anotherStoreCount)).toBe(0)

  store.increment()
  store.incrementSecond()
  store.anotherStore.increment()
  store.incrementDeep()

  expect(getRenderProp(renderMock, 4)).toBe(7)
  expect(getRenderProp(renderMock, 4, store => store.secondCount)).toBe(1)
  expect(getRenderProp(renderMock, 4, store => store.deepCount)).toBe(1)
  expect(getRenderProp(renderMock, 4, store => store.anotherStoreCount)).toBe(1)
})
