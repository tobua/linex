/**
 * During render the mock will be called with the props of the component
 * This util helps accessing the appropriate prop value.
 **/
export default (mock, call = 0, key = 'count') => {
  return mock.mock.calls[call][0][key]
}
