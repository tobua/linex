import { create, options } from 'linex'

// Runs each test with and without object-fallback.
export default (name, runner) => {
  const createHandle = (fallback, store) => {
    return create(store)
  }

  test(`${name}.`, () => {
    options({ fallback: false })
    runner(false, createHandle.bind(null, false))
  })
  test(`${name} with fallback option.`, () => {
    options({ fallback: true })
    runner(true, createHandle.bind(null, true))
  })
}
