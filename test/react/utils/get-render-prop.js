/**
 * During render the mock will be called with the props of the component
 * This util helps accessing the appropriate prop value.
 **/
export default (mock, call = 0, getValue = state => state.count) => {
  return getValue(mock.mock.calls[call][0])
}
