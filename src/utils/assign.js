import assign from 'object-assign'

export default (...args) => {
  if (typeof Object.assign !== 'undefined') {
    return Object.assign(...args)
  }

  return assign(...args)
}
