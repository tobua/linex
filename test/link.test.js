import run from './utils/run'
import { counter } from './stores'

beforeEach(() => {
  // Hide plugin.
  console.log = () => {}
})

run('Linked callback is executed on state changes', (fallback, create, get, set, link) => {
  const mapStore = store => ({
    count: store.count,
    secondCount: store.secondCount
  })
  const mockChange = jest.fn()
  const store = create(counter(create))

  link(mapStore, mockChange)

  expect(mockChange.mock.calls.length).toEqual(0)

  store.increment(undefined)

  expect(mockChange.mock.calls.length).toEqual(1)
})

run('Linked callback is not executed on non-mapped state changes', (fallback, create, get, set, link) => {
  const mapStore = store => ({
    count: store.count,
    secondCount: store.secondCount
  })
  const mockChange = jest.fn()
  const store = create(counter(create))

  link(mapStore, mockChange)

  expect(mockChange.mock.calls.length).toEqual(0)

  expect(store.anotherStore.count).toEqual(0)
  store.anotherStore.increment()
  expect(store.anotherStore.count).toEqual(1)

  expect(mockChange.mock.calls.length).toEqual(0)
})

run('Can unsubscribe with return value', (fallback, create, get, set, link) => {
  const mapStore = store => ({
    count: store.count,
    secondCount: store.secondCount
  })
  const mockChange = jest.fn()
  const store = create(counter(create))

  const { unsubscribe } = link(mapStore, mockChange)

  expect(mockChange.mock.calls.length).toEqual(0)

  store.increment()

  expect(mockChange.mock.calls.length).toEqual(1)

  unsubscribe()
  store.increment()

  expect(mockChange.mock.calls.length).toEqual(1)
})

run('Returns correct initial mapped state', (fallback, create, get, set, link) => {
  const mapStore = store => ({
    count: store.count,
    secondCount: store.secondCount
  })
  const store = create(counter(create))

  const { state } = link(mapStore, () => {})

  expect(state.count).toEqual(0)
  expect(state.secondCount).toEqual(0)
})

run('Warns if link happens before creating state', (fallback, create, get, set, link) => {
  set(null) // Reset stores from previous tests.
  const mapStore = store => ({
    count: store.count,
    secondCount: store.secondCount
  })
  const mockChange = jest.fn()
  const mockWarn = jest.fn()
  console.warn = mockWarn

  expect(mockChange.mock.calls.length).toEqual(0)
  expect(mockWarn.mock.calls.length).toEqual(0)

  const linkResult = link(mapStore, mockChange)

  expect(mockChange.mock.calls.length).toEqual(0)
  expect(mockWarn.mock.calls.length).toEqual(1)

  expect(linkResult).toBeUndefined()

  const store = create(counter(create))

  expect(mockChange.mock.calls.length).toEqual(0)

  console.warn = console.warn
})
