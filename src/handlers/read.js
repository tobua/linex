export default (app) => {
  return {
    target: app.read,
    handler: (inputs, state, method, path, type) => {
      if (type === 'read') {
        // In this case the method is the value being accessed.
        return method
      }

      return method(...inputs)
    }
  }
}
