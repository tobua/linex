import { create, get, set, link, options } from 'linex'

// All tests should also successfully run with the fallback option, therefore
// this util will run the test twice once with and once without the option.
export default (name, runner) => {
  const createHandle = (fallback, store) => {
    return create(store)
  }

  test(`${name}.`, () => {
    options({ fallback: false })
    runner(false, createHandle.bind(null, false), get, set, link)
  })
  test(`${name} with fallback option.`, () => {
    options({ fallback: true })
    runner(true, createHandle.bind(null, true), get, set, link)
  })
}
