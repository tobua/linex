import assign from 'object-assign'

const options = {}

// Access global options.
export const getOptions = () => options

// Used to set global options.
export default values => assign(options, values)
